import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeCocineroBarmanPage } from './home-cocinero-barman.page';

describe('HomeCocineroBarmanPage', () => {
  let component: HomeCocineroBarmanPage;
  let fixture: ComponentFixture<HomeCocineroBarmanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCocineroBarmanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
