import {Component} from '@angular/core';
import {RaceModel} from "../models/race.model";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {RaceService} from "../services/race.service";
import {FromNowPipe} from "../pipes/from-now.pipe";
import {PonyComponent} from "../pony/pony.component";
import {PonyModel} from "../models/pony.model";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'pr-bet',
  standalone: true,
  imports: [
    FromNowPipe,
    PonyComponent,
    RouterLink,
    NgbAlert
  ],
  templateUrl: './bet.component.html',
  styleUrl: './bet.component.css'
})
export class BetComponent {
  raceModel: RaceModel | null = null;
  betFailed = false;

  constructor(private route: ActivatedRoute, private raceService: RaceService) {
    const raceId = +this.route.snapshot.paramMap.get('raceId')!;
    this.raceService.get(raceId).subscribe(race => {
      console.log(race);
      (this.raceModel = race)
    });
  }

  betOnPony(pony: PonyModel): void {
    if (this.isPonySelected(pony)) {
      this.raceService.cancelBet(this.raceModel!.id).subscribe({
        next: () => (this.raceModel!.betPonyId = undefined),
        error: () => (this.betFailed = true)
      })
    } else {
      this.raceService.bet(this.raceModel!.id, pony.id).subscribe({
        next: race => (this.raceModel = race),
        error: () => (this.betFailed = true)
      });
    }
  }

  isPonySelected(pony: PonyModel): boolean {
    return pony.id === this.raceModel!.betPonyId;
  }
}
