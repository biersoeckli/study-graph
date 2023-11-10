import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CourseOverviewPageComponent } from './course-overview-page/course-overview-page.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {
    path: '',
    component: CourseOverviewPageComponent
  }
];

@NgModule({
  declarations: [
    CourseOverviewPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CourseOverviewModule { }
