import { Routes } from '@angular/router';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'allCourses',component:AllCoursesComponent},
    {path:'Register/:param',component:RegisterComponent},
    {path:'Lecturer-registration',component:RegisterComponent},
   
];
