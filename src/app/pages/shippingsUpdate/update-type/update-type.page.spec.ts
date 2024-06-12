import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateTypePage } from './update-type.page';

describe('UpdateTypePage', () => {
  let component: UpdateTypePage;
  let fixture: ComponentFixture<UpdateTypePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
