import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {


  paramValue: string = "";
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
  }

  registerForm: FormGroup = new FormGroup({});


  saveNewUser(){
      alert("נרשמת בהצלחה!");
      console.log(this.registerForm.value);
      this.router.navigate(['/allCourses'])
     
      
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
