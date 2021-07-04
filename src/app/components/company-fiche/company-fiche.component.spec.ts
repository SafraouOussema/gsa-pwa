import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFicheComponent } from './company-fiche.component';

describe('CompanyFicheComponent', () => {
  let component: CompanyFicheComponent;
  let fixture: ComponentFixture<CompanyFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyFicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
