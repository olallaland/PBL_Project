import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiscussionDialogComponent } from './create-discussion-dialog.component';

describe('CreateDiscussionDialogComponent', () => {
  let component: CreateDiscussionDialogComponent;
  let fixture: ComponentFixture<CreateDiscussionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDiscussionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiscussionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
