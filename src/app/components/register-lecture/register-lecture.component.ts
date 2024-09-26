import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { LecturerService } from '../../services/lecturer.service';
import Lecturer from '../../../models/Lecturer';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './register-lecture.component.html',
  styleUrl: './register-lecture.component.scss'
})

export class RegisterLectureComponent implements OnInit {
  lecturers: Lecturer [] | undefined;


  isLecture: boolean = false;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private lecture: LecturerService) {
  }

  registerForm: FormGroup = new FormGroup({});

  //יש קודם לעשות פונקציה שתבדוק האם המשתמש כבר קיים getUserById? ורק אם לא קיים תעביר לפונקצציה הנ"ל
  isLectureExist(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.lecture.getLecturer().pipe(take(1)).subscribe(myRes => {
        const lecturerExist = myRes.find(lecture =>
          lecture.name === this.registerForm.get('name')!.value &&
          lecture.password === this.registerForm.get('password')!.value &&
          lecture.email === this.registerForm.get('email')!.value
        );
        resolve(!lecturerExist==false);
      }, err => {
        alert("ERROR!");
        reject(false);
      });
    });
  }

  async getLecturers() {
    try {
      const myRes = await this.lecture.getLecturer().pipe(take(1)).toPromise();
      console.log("מרצים:", myRes);
      this.lecturers = myRes;
    } catch (err) {
      console.error("Error fetching lecturers:", err);
    }
  }
  

  async saveNewLecture() {
   await this.getLecturers();
    try {
      this.isLecture = await this.isLectureExist();
      if (!this.isLecture && this.lecturers) {
        const data: Lecturer = {
          name: this.registerForm.get('name')!.value,
          email: this.registerForm.get('email')!.value,
          address: this.registerForm.get('address')?.value,
          password: this.registerForm.get('password')!.value,
        }
        
        

        this.lecture.addLecturer(data).pipe(take(1)).subscribe(
          myRes => {
            console.log("success", myRes);
            console.log("lecturer",data);
            Swal.fire({
              text: 'נכנסת בהצלחה',
              icon: 'success',
            })
            this.router.navigate(['/Register-lecture']);
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
      console.error('Error checking lecture existence:', error);
    }
  }


  ngOnInit(): void {


    this.registerForm = this.fb.group({
      // name: new FormControl(this.route.paramMap.subscribe(params => {
      //   this.paramValue = params.get("param") || '';
      // }), [Validators.required]),
      name: ['', Validators.required],
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





