import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SplashScreemPage } from './splash-screem.page';

describe('SplashScreemPage', () => {
  let component: SplashScreemPage;
  let fixture: ComponentFixture<SplashScreemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SplashScreemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
