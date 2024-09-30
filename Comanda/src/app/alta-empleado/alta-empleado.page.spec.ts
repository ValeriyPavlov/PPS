import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AltaEmpleadoPage } from './alta-empleado.page';

describe('AltaEmpleadoPage', () => {
  let component: AltaEmpleadoPage;
  let fixture: ComponentFixture<AltaEmpleadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaEmpleadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
