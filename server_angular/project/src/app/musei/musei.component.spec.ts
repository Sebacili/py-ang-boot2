import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseiComponent } from './musei.component';

describe('MuseiComponent', () => {
  let component: MuseiComponent;
  let fixture: ComponentFixture<MuseiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuseiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuseiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
