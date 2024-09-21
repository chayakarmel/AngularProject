import { Routes } from '@angular/router';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component'; // Import the Course Details component
import { AuthGuard } from './auth.guard';
import { OneCourseComponent } from './components/one-course/one-course.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'allCourses', component: AllCoursesComponent, canActivate: [AuthGuard] },
    { path: 'Register/:param', component: RegisterComponent },
    { path: 'AddCourse', component: AddCourseComponent },
    { path: 'EditCourse', component: EditCourseComponent },
    { path: 'courseDetails/:id', component: CourseDetailsComponent },
    {path:'oneCourse/:id',component: OneCourseComponent}
];
