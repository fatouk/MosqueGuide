import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeSouratesPage } from './liste-sourates.page';

describe('ListeSouratesPage', () => {
  let component: ListeSouratesPage;
  let fixture: ComponentFixture<ListeSouratesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListeSouratesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
