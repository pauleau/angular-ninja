import { Component, Input } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { DatePipe } from '@angular/common';
import { PonyComponent } from '../pony/pony.component';
import { FromNowPipe } from '../pipes/from-now.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pr-race',
  standalone: true,
  imports: [PonyComponent, DatePipe, FromNowPipe, RouterLink],
  templateUrl: './race.component.html',
  styleUrl: './race.component.css'
})
export class RaceComponent {
  @Input({ required: true }) raceModel!: RaceModel;
}
