import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOnePage } from './add-one.page';

describe('AddOnePage', () => {
  let component: AddOnePage;
  let fixture: ComponentFixture<AddOnePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
