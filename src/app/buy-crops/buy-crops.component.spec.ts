import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCropsComponent } from './buy-crops.component';

describe('BuyCropsComponent', () => {
  let component: BuyCropsComponent;
  let fixture: ComponentFixture<BuyCropsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyCropsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyCropsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
