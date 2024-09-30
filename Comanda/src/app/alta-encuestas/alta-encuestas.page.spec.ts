import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AltaEncuestasPage } from './alta-encuestas.page';

describe('AltaEncuentasPage', () => {
  let component: AltaEncuestasPage;
  let fixture: ComponentFixture<AltaEncuestasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEncuestasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
