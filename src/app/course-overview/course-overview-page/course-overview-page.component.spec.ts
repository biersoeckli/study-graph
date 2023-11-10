import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOverviewPageComponent } from './course-overview-page.component';

describe('CourseOverviewPageComponent', () => {
  let component: CourseOverviewPageComponent;
  let fixture: ComponentFixture<CourseOverviewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseOverviewPageComponent]
    });
    fixture = TestBed.createComponent(CourseOverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
