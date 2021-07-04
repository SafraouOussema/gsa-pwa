import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFicheComponent } from './users-fiche.component';

describe('UsersFicheComponent', () => {
  let component: UsersFicheComponent;
  let fixture: ComponentFixture<UsersFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersFicheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
