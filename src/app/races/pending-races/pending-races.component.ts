import { Component } from '@angular/core';
import {RacesComponent} from "../races.component";
import {RaceModel} from "../../models/race.model";
import {RaceService} from "../../services/race.service";
import {RaceComponent} from "../../race/race.component";
import {RouterLink} from "@angular/router";

@Component({
  standalone: true,
  imports: [
    RaceComponent,
    RouterLink
  ],
  templateUrl: './pending-races.component.html',
  styleUrl: './pending-races.component.css'
})
export class PendingRacesComponent {
  races: Array<RaceModel> = [];

  constructor(private raceS: RaceService) {
    this.raceS.list('PENDING').subscribe(races => (this.races = races));
  }
}
