import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecservoperaComponent } from './secservopera.component';

describe('SecservoperaComponent', () => {
  let component: SecservoperaComponent;
  let fixture: ComponentFixture<SecservoperaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecservoperaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecservoperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
