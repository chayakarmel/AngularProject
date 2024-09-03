import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,RouterOutlet,LoginComponent,AllCoursesComponent,RegisterComponent,NavBarComponent,RouterLink,AddCourseComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularProject';
}
