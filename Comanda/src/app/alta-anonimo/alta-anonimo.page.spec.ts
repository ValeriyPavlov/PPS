import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AltaAnonimoPage } from './alta-anonimo.page';

describe('AltaAnonimoPage', () => {
  let component: AltaAnonimoPage;
  let fixture: ComponentFixture<AltaAnonimoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaAnonimoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
