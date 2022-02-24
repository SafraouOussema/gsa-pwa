import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyUserFicheComponent } from './company-user-fiche.component';

describe('CompanyUserFicheComponent', () => {
  let component: CompanyUserFicheComponent;
  let fixture: ComponentFixture<CompanyUserFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyUserFicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyUserFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
