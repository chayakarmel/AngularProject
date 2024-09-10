import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import User from '../../../models/User';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule,MatFormFieldModule,MatButtonModule,MatInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {

  isUser:boolean=false;
  paramValue: string = "";
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private user: UserService) {
  }

  registerForm: FormGroup = new FormGroup({});

  //יש קודם לעשות פונקציה שתבדוק האם המשתמש כבר קיים getUserById? ורק אם לא קיים תעביר לפונקצציה הנ"ל
  isUserExist(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.user.getUser().pipe(take(1)).subscribe(myRes => {
        const userExists = myRes.find(user =>
          user.name === this.registerForm.get('name')!.value &&
          user.password === this.registerForm.get('password')!.value &&
          user.email === this.registerForm.get('email')!.value
        );
        resolve(!!userExists);
      }, err => {
        alert("ERROR!");
        reject(false);
      });
    });
  }
  async saveNewUser() {
    try {
      this.isUser = await this.isUserExist();
      if (!this.isUser) {
        const data: User = {
          name: this.registerForm.get('name')!.value,
          email: this.registerForm.get('email')!.value,
          address: this.registerForm.get('address')?.value,
          password: this.registerForm.get('password')!.value,
        }

        this.user.createUser(data).pipe(take(1)).subscribe(
          myRes => {
            console.log("success", myRes);
           Swal.fire({
          text: 'נכנסת בהצלחה',
          icon: 'success',
        })
            this.router.navigate(['/allCourses']);
          }, err => {
            Swal.fire({
              text: 'שגיאה',
              icon: 'error',
            })
          }
        );
      } else {
        alert("היוזר כבר קיים במערכת!!!!!");
      }
    } catch (error) {
      // Handle errors from isUserExist
      console.error('Error checking user existence:', error);
    }
  }


  ngOnInit(): void {


    this.registerForm = this.fb.group({
      name: new FormControl(this.route.paramMap.subscribe(params => {
        this.paramValue = params.get("param") || '';
      }), [Validators.required]),
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/),
        
      ]]

    })
    // this.route.paramMap.subscribe(params => {
    //   this.paramValue =  params.get("param") || '';
    // });
  }

}
