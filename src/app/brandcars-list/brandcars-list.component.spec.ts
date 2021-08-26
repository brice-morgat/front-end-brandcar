import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandcarsListComponent } from './brandcars-list.component';

describe('BrandcarsListComponent', () => {
  let component: BrandcarsListComponent;
  let fixture: ComponentFixture<BrandcarsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandcarsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandcarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
