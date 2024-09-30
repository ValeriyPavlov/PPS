import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphEncuestasPage } from './graph-encuestas.page';

describe('GraphEncuestasPage', () => {
  let component: GraphEncuestasPage;
  let fixture: ComponentFixture<GraphEncuestasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphEncuestasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
