import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogPage } from './log.page';

describe('LogPage', () => {
  let component: LogPage;
  let fixture: ComponentFixture<LogPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
