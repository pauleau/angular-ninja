import { Component, OnInit } from '@angular/core';

import { RaceComponent } from '../race/race.component';
import { RaceService } from '../services/race.service';
import { RaceModel } from '../models/race.model';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'pr-races',
  standalone: true,
  imports: [RaceComponent, RouterLink, RouterOutlet],
  templateUrl: './races.component.html',
  styleUrl: './races.component.css'
})
export class RacesComponent {
}
