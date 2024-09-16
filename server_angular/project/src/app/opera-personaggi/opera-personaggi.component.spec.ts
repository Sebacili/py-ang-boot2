import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperaPersonaggiComponent } from './opera-personaggi.component';

describe('OperaPersonaggiComponent', () => {
  let component: OperaPersonaggiComponent;
  let fixture: ComponentFixture<OperaPersonaggiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperaPersonaggiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperaPersonaggiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
