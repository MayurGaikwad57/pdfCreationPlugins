import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfObjectiveComponent } from './pdf-objective.component';

describe('PdfObjectiveComponent', () => {
  let component: PdfObjectiveComponent;
  let fixture: ComponentFixture<PdfObjectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfObjectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
