import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
    if (this.users.getUser().find(user => user.name === this.username && user.password === this.password)) {
      alert("the user exist!")
      this.router.navigate(['/allCourses'])
    }


    else {
      alert("the user isn't exist!");
      const param=this.username;
      this.router.navigate(['/Register',param])
    }
  }

  LecturerRegistration(){
    const param=this.courseName;
    this.router.navigate(['/Register',param])
  }
}


