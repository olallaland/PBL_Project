import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './components/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { RegisterComponent } from './components/register/register.component';
import {RouterModule} from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import {MatCardModule} from '@angular/material/card';
import {CourseService} from './services/course.service';
import {MatDialogModule} from '@angular/material/dialog';
import { CourseDetailDialogComponent } from './components/dialogs/course-detail-dialog/course-detail-dialog.component';
import {MatRippleModule} from '@angular/material/core';
import {SessionService} from './services/session.service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {ProjectService} from './services/project.service';
import {LoginService} from './services/login.service';
import {ProjectDetailDialogComponent} from './components/dialogs/project-detail-dialog/project-detail-dialog.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTreeModule} from '@angular/material/tree';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import { AddTaskDialogComponent } from './components/dialogs/add-task-dialog/add-task-dialog.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CreateDiscussionDialogComponent } from './components/dialogs/create-discussion-dialog/create-discussion-dialog.component';
import { UploadFileDialogComponent } from './components/dialogs/upload-file-dialog/upload-file-dialog.component';
import { ScoreDialogComponent } from './components/dialogs/score-dialog/score-dialog.component';
import {ToastrModule} from 'ngx-toastr';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginComponent,
    RegisterComponent,
    CourseListComponent,
    CourseDetailDialogComponent,
    CourseDetailsComponent,
    ProjectDetailDialogComponent,
    ProjectDetailsComponent,
    AddTaskDialogComponent,
    AddCourseComponent,
    CreateDiscussionDialogComponent,
    UploadFileDialogComponent,
    ScoreDialogComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'user/register', component: RegisterComponent},
      {path: 'user/login', component: LoginComponent},
      {path: 'user/profile', component: ProfileComponent},
      {path: 'course/details/:courseId', component: CourseDetailsComponent},
      {path: 'project/details/:projectId', component: ProjectDetailsComponent},
      {path: 'course/add', component: AddCourseComponent},
    ]),
    MatCardModule,
    MatDialogModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatTabsModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    MatExpansionModule,
    MatTreeModule,
    MatProgressBarModule,
    MatTableModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true,
      positionClass: 'toast-top-center',
      closeButton: true,
      progressBar: true,
      timeOut: 2000,
      extendedTimeOut: 1000,
      preventDuplicates: true,
      countDuplicates: true
    })
  ],
  providers: [CourseService, SessionService, FormBuilder, MatMenuModule, ProjectService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
