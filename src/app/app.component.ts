import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule,RouterOutlet,LoginComponent,AllCoursesComponent,RegisterComponent,NavBarComponent,RouterLink,AddCourseComponent,EditCourseComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

    userInitial: string = '';
  
    ngOnInit(): void {
      const userName = sessionStorage.getItem('userName');
    
    // חילץ את האות הראשונה מהשם
    if (userName) {
      this.userInitial = userName.charAt(0).toUpperCase();
      console.log(this.userInitial)
    }
    }
   logoutUser() {
    // הסרת נתונים מ-sessionStorage
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('password'); // אם יש לך טוקן או פרטים נוספים לשמור
  }
  title = 'AngularProject';
  
}
