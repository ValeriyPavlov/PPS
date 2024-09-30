import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatbPage } from './chatb.page';

describe('ChatbPage', () => {
  let component: ChatbPage;
  let fixture: ComponentFixture<ChatbPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
