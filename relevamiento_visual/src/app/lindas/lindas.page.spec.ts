import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LindasPage } from './lindas.page';

describe('LindasPage', () => {
  let component: LindasPage;
  let fixture: ComponentFixture<LindasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LindasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
