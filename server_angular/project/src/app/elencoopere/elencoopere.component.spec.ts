import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElencoopereComponent } from './elencoopere.component';

describe('ElencoopereComponent', () => {
  let component: ElencoopereComponent;
  let fixture: ComponentFixture<ElencoopereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElencoopereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElencoopereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
