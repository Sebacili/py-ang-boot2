import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistiComponent } from './artisti.component';

describe('ArtistiComponent', () => {
  let component: ArtistiComponent;
  let fixture: ComponentFixture<ArtistiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
