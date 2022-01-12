import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireWorkerComponent } from './hire-worker.component';

describe('HireWorkerComponent', () => {
  let component: HireWorkerComponent;
  let fixture: ComponentFixture<HireWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HireWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
