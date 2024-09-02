import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {  take } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username!: string;
  password!: string;
  courseName!:string;

  constructor(private users: UserService, private router: Router) {
  }

  isUserExist() {
    this.users.getUser().pipe(take(1)).subscribe(myRes => {
        console.log(myRes);
        const userExists = myRes.find(user => user.name === this.username && user.password === this.password);
        
        if (userExists) {
            alert("The user exists!");
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


