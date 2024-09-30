import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeMozoPage } from './home-mozo.page';

describe('HomeMozoPage', () => {
  let component: HomeMozoPage;
  let fixture: ComponentFixture<HomeMozoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMozoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
