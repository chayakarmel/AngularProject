import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {  take } from 'rxjs';
import Swal from 'sweetalert2'
import Lecturer from '../../../models/Lecturer';
import { LecturerService } from '../../services/lecturer.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
// import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,MatInputModule,MatFormFieldModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username!: string;
  password!: string;
  courseName!:string;

  lecturerExist?:Lecturer;
  constructor(private lecturers:LecturerService,private users: UserService, private router: Router) {
  }

 
  isLecturerExist(){
  this.lecturers.getLecturer().pipe(take(1)).subscribe(myRes => {
    console.log("מרצים:",myRes);
    this.lecturerExist = myRes.find(user => user.name === this.username && user.password === this.password);
    console.log(this.lecturerExist?.lecturerId)
    sessionStorage.setItem('lecturerName',this.username);
    sessionStorage.setItem('password', this.password); 
     sessionStorage.setItem('lecturerId',this.lecturerExist!.lecturerId.toString());
    if (this.lecturerExist) {
      Swal.fire({
        text: 'נכנסת בהצלחה',
        icon: 'success',
      })
        this.router.navigate(['/allCourses']);
    } else {
   
        this.isUserExist();
    }
}, err => {
    alert("ERROR!");
});
  }

  isUserExist() {
    this.users.getUser().pipe(take(1)).subscribe(myRes => {
        const userExists = myRes.find(user => user.name === this.username && user.password === this.password);
        
        sessionStorage.setItem('userName',this.username);
            sessionStorage.setItem('password', this.password); 
        if (userExists) {
          Swal.fire({
            text: 'נכנסת בהצלחה',
            icon: 'success',
          })
            this.router.navigate(['/allCourses']);
        } else {

       
            alert("The user doesn't exist!");
            const param = this.username;
          
            this.router.navigate(['/Register', param]);
        }
    }, err => {
        alert("ERROR!");
    });
}



  LecturerRegistration(){
    const param=this.courseName;
    this.router.navigate(['/Register',param])
  }
}


