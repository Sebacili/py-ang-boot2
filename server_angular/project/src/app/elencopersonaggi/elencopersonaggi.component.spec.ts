import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElencopersonaggiComponent } from './elencopersonaggi.component';

describe('ElencopersonaggiComponent', () => {
  let component: ElencopersonaggiComponent;
  let fixture: ComponentFixture<ElencopersonaggiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElencopersonaggiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElencopersonaggiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
