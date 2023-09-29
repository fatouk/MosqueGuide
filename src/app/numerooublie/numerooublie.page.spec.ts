import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NumerooubliePage } from './numerooublie.page';

describe('NumerooubliePage', () => {
  let component: NumerooubliePage;
  let fixture: ComponentFixture<NumerooubliePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NumerooubliePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
