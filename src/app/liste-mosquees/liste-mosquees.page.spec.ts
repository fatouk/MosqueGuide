import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeMosqueesPage } from './liste-mosquees.page';

describe('ListeMosqueesPage', () => {
  let component: ListeMosqueesPage;
  let fixture: ComponentFixture<ListeMosqueesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListeMosqueesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
