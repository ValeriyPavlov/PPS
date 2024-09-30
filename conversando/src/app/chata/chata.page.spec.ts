import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChataPage } from './chata.page';

describe('ChataPage', () => {
  let component: ChataPage;
  let fixture: ComponentFixture<ChataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
