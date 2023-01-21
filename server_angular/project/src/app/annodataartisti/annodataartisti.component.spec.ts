import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnodataartistiComponent } from './annodataartisti.component';

describe('AnnodataartistiComponent', () => {
  let component: AnnodataartistiComponent;
  let fixture: ComponentFixture<AnnodataartistiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnodataartistiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnodataartistiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
