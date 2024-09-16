import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperaTitoloComponent } from './opera-titolo.component';

describe('OperaTitoloComponent', () => {
  let component: OperaTitoloComponent;
  let fixture: ComponentFixture<OperaTitoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperaTitoloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperaTitoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
