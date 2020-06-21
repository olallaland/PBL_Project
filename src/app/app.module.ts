import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
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
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {ProjectService} from './services/project.service';
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
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {UserService} from './services/user.service';
import {TaskService} from './services/task.service';
import {DiscussionService} from './services/discussion.service';
import {FileService} from './services/file.service';
import { AddProjectComponent } from './components/add-project/add-project.component';
import {UserManagementComponent} from './components/user-management/user-management.component';
import {UserManagementService} from './services/user-management.service';
import {UserDetailDialogComponent } from './components/dialogs/user-detail-dialog/user-detail-dialog.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';

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
    ProfileComponent,
    EditProfileComponent,
    AddProjectComponent,
    UserManagementComponent,
    UserDetailDialogComponent,
    AddUserComponent,
    FooterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
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
            {path: 'user/profile/:userID', component: ProfileComponent},
            {path: 'user/edit/:userID', component: EditProfileComponent},
            {path: 'course/list', component: CourseListComponent},
            {path: 'course/details/:courseID', component: CourseDetailsComponent},
            {path: 'project/details/:courseID/:projectID', component: ProjectDetailsComponent},
            {path: 'project/add/:courseID', component: AddProjectComponent},
            {path: 'course/add', component: AddCourseComponent},
            {path: 'user-management', component: UserManagementComponent},
            {path: 'user/add-user', component: AddUserComponent}
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
        // 为提示框设定默认参数
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
        }),
        FormsModule
    ],
  providers: [CourseService, SessionService, FormBuilder, MatMenuModule, ProjectService, UserService, TaskService,
             DiscussionService, FileService, UserManagementService,
    {
      provide: 'BASE_CONFIG',
      // 3.94.89.139 localhost 3.219.247.83
      useValue: 'http://3.219.247.83:8089'
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
