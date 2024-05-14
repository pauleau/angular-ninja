import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RaceModel} from "../models/race.model";
import {RaceService} from "../services/race.service";
import {PonyModel, PonyWithPositionModel} from "../models/pony.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PonyComponent} from "../pony/pony.component";
import {style} from "@angular/animations";
import {bufferToggle, catchError, EMPTY, filter, groupBy, interval, map, mergeMap, Subject, switchMap, tap} from "rxjs";
import {FromNowPipe} from "../pipes/from-now.pipe";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'pr-live',
  standalone: true,
  imports: [
    PonyComponent,
    FromNowPipe,
    NgbAlert
  ],
  templateUrl: './live.component.html',
  styleUrl: './live.component.css'
})
export class LiveComponent {
  raceModel: RaceModel | null = null;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  error: boolean = false;
  winners: Array<PonyWithPositionModel> = [];
  betWon: boolean | null = null;
  clickSubject: Subject<PonyWithPositionModel> = new Subject<PonyWithPositionModel>();

  constructor(
    private route: ActivatedRoute,
    private raceService: RaceService
  ) {
    const raceId = +this.route.snapshot.paramMap.get('raceId')!;
    this.raceService
      .get(raceId)
      .pipe(
        tap((race: RaceModel) => (this.raceModel = race)),
        filter(race => race.status !== 'FINISHED'),
        switchMap(race => this.raceService.live(race.id)),
        takeUntilDestroyed()
      )
      .subscribe({
        next: positions => {
          this.poniesWithPosition = positions;
          this.raceModel!.status = 'RUNNING';
        },
        error: () => (this.error = true),
        complete: () => {
          this.raceModel!.status = 'FINISHED';
          this.winners = this.poniesWithPosition.filter(pony => pony.position >= 100);
          this.betWon = this.winners.some(pony => pony.id === this.raceModel!.betPonyId);
        }
      });

    this.clickSubject.pipe(
      groupBy(pony => pony.id, {element: pony => pony.id}),
      mergeMap(obs => obs.pipe(bufferToggle(obs, () => interval(1000)))),
      filter(array => array.length >= 5),
      map(array => array[0]),
      switchMap(ponyId => this.raceService.boost(this.raceModel!.id, ponyId!)
        .pipe(catchError(() => EMPTY))
      )
    ).subscribe(() => {});
  }

  protected readonly style = style;

  onClick(pony: PonyWithPositionModel): void {
    this.clickSubject.next(pony);
  }
}
