import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import User from '../../../models/User';
import { UserService } from '../../services/user.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {


  paramValue: string = "";
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private user: UserService) {
  }

  registerForm: FormGroup = new FormGroup({});

  //יש קודם לעשות פונקציה שתבדוק האם המשתמש כבר קיים getUserById? ורק אם לא קיים תעביר לפונקצציה הנ"ל

  saveNewUser(){
    const data:User = {
      // id:4,//יש לשנות לאוטומטי 
      name: this.registerForm.get('name')!.value,
      email: this.registerForm.get('email')!.value,
      address:this.registerForm.get('address')?.value,
      password:this.registerForm.get('password')!.value, 
    }

    this.user.createUser(data).pipe(take(1)).subscribe(
      myRes => {
      console.log("success" ,myRes);
      alert("נרשמת בהצלחה!");
      // console.log(this.registerForm.value);
      this.router.navigate(['/allCourses'])
    }, err => {
      alert("ERROR!");
     
    })
 
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
