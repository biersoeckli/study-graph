import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [{
    path: 'courses',
    loadChildren: () => import('./course-overview/course-overview.module').then(m => m.CourseOverviewModule),
    canActivate: [
      MsalGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
