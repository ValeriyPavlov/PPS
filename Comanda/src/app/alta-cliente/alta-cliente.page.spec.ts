import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AltaClientePage } from './alta-cliente.page';

describe('AltaClientePage', () => {
  let component: AltaClientePage;
  let fixture: ComponentFixture<AltaClientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
