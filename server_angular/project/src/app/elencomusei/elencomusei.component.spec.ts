import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElencomuseiComponent } from './elencomusei.component';

describe('ElencomuseiComponent', () => {
  let component: ElencomuseiComponent;
  let fixture: ComponentFixture<ElencomuseiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElencomuseiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElencomuseiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
