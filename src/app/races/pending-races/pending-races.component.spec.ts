import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRacesComponent } from './pending-races.component';

describe('PendingRacesComponent', () => {
  let component: PendingRacesComponent;
  let fixture: ComponentFixture<PendingRacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingRacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
