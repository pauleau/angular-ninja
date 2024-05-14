import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PonyModel } from '../models/pony.model';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pr-pony',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './pony.component.html',
  styleUrl: './pony.component.css'
})
export class PonyComponent {
  @Input({ required: true }) ponyModel!: PonyModel;
  @Input() isRunning?: boolean = false;
  @Input() isBoosted?: boolean = false;
  @Output() readonly ponyClicked = new EventEmitter<PonyModel>();

  getPonyImageUrl(): string {
    return `assets/images/pony-${this.ponyModel.color?.toLowerCase()}${this.isBoosted ? '-rainbow' : this.isRunning ? '-running' : ''}.gif`;
  }

  clicked(): void {
    this.ponyClicked.emit(this.ponyModel);
  }
}
