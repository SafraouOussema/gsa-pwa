import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportFicheComponent } from './export-fiche.component';

describe('ExportFicheComponent', () => {
  let component: ExportFicheComponent;
  let fixture: ComponentFixture<ExportFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportFicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
