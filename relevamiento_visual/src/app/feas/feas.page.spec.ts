import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeasPage } from './feas.page';

describe('FeasPage', () => {
  let component: FeasPage;
  let fixture: ComponentFixture<FeasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FeasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
