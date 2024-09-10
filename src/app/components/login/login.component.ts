import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import Swal from 'sweetalert2';
import Lecturer from '../../../models/Lecturer';
import { LecturerService } from '../../services/lecturer.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  courseName: string = '';

  lecturerExist?: Lecturer;

  constructor(
    private lecturerService: LecturerService,
    private userService: UserService,
    private router: Router
  ) {}

  isLecturerExist() {
    this.lecturerService.getLecturer().pipe(take(1)).subscribe(myRes => {
      console.log("מרצים:", myRes);
      this.lecturerExist = myRes.find(user => user.name === this.username && user.password === this.password);
      
      if (this.lecturerExist) {
        sessionStorage.setItem('lecturerName', this.username);
        sessionStorage.setItem('password', this.password); 
        sessionStorage.setItem('lecturerId', this.lecturerExist.lecturerId.toString());

        Swal.fire({
          text: 'נכנסת בהצלחה',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/allCourses']);
        });
      } else {
        this.isUserExist();
      }
    }, err => {
      Swal.fire({
        text: 'שגיאה בהתחברות',
        icon: 'error',
      });
      
    });
  }

  isUserExist() {
    this.userService.getUser().pipe(take(1)).subscribe(myRes => {
      const userExists = myRes.find(user => user.name === this.username && user.password === this.password);

      if (userExists) {
        sessionStorage.setItem('userName', this.username);
        sessionStorage.setItem('password', this.password); 
        
        Swal.fire({
          text: 'נכנסת בהצלחה',
          icon: 'success',
        }).then(() => {
          this.router.navigate(['/allCourses']);
        });
      } else {
        Swal.fire({
          text: 'המשתמש לא קיים!',
          icon: 'error',
        }).then(() => {
          this.router.navigate(['/Register', this.username]);
        });
      }
    }, err => {
      Swal.fire({
        text: 'שגיאה בהתחברות',
        icon: 'error',
      });
    });
  }

  LecturerRegistration() {
    this.router.navigate(['/Register', this.courseName]);
  }
}
