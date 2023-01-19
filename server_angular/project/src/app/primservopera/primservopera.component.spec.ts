import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimservoperaComponent } from './primservopera.component';

describe('PrimservoperaComponent', () => {
  let component: PrimservoperaComponent;
  let fixture: ComponentFixture<PrimservoperaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimservoperaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimservoperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
