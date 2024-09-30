import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewEncuestasPage } from './view-encuestas.page';

describe('ViewEncuestasPage', () => {
  let component: ViewEncuestasPage;
  let fixture: ComponentFixture<ViewEncuestasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEncuestasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
