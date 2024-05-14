import {Component} from '@angular/core';
import {RaceModel} from "../../models/race.model";
import {RaceService} from "../../services/race.service";
import {RaceComponent} from "../../race/race.component";
import {RouterLink} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {SlicePipe} from "@angular/common";

@Component({
  standalone: true,
  imports: [
    RaceComponent,
    RouterLink,
    NgbPagination,
    SlicePipe
  ],
  templateUrl: './finished-races.component.html',
  styleUrl: './finished-races.component.css'
})
export class FinishedRacesComponent {
  races: Array<RaceModel> = [];
  page = 1;

  constructor(private raceS: RaceService) {
    this.raceS.list('FINISHED').subscribe(races => (this.races = races));
  }
}
