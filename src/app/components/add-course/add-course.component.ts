import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import {  take } from 'rxjs';
import Category from '../../../models/Category';
import { Course } from '../../../models/Course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})

export class AddCourseComponent {
  courseForm: FormGroup = new FormGroup({});
  category:Category[]=[];
  constructor(private fb: FormBuilder, private router: Router,private categories: CategoryService,private course:CourseService) { }



  ngOnInit() {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      categoryId: ['', Validators.required],
      numberOfLessons: ['', Validators.required],
      startDate: ['', Validators.required],
      // syllabus: this.fb.array(['', Validators.required]),
       syllabus: [''], 
      learningMode: ['', Validators.required],
      lecturerId: ['', Validators.required],
      imagePath: ['']
    });
    this.getCategories();
  }

  get syllabus(): FormArray {
    return this.courseForm.get('syllabus') as FormArray;
  }

  addSyllabus() {
    this.syllabus.push(this.fb.control(''));
  }


  removeSyllabus(index: number): void {
    (this.courseForm.get('syllabus') as FormArray).removeAt(index);
  }

 
  onInputChange(index: number) {
    const control = this.syllabus.at(index);
    if (control.value === '') {
      this.removeSyllabus(index);
    }
  }
  
  // saveNewCourse(){
  //   if (this.courseForm.valid) {
  //         console.log("course:",this.courseForm.value);
  //         this.router.navigate(['/allCourses']);
  //       }
  //     }
  

  saveNewCourse() {
    try {
        const data: Course = {
       
          courseName: this.courseForm.get('courseName')!.value,
          categoryId: this.courseForm.get('categoryId')?.value,
          numberOfLessons: this.courseForm.get('numberOfLessons')!.value,
          startDate: this.courseForm.get('startDate')!.value,
   
         syllabus: this.courseForm.get('syllabus')!.value,
          modeId: this.courseForm.get('learningMode')!.value,
          lecturerId: this.courseForm.get('lecturerId')!.value,
          imagePath: this.courseForm.get('imagePath')!.value,
        }
        console.log(data);
        this.course.createCourse(data).pipe(take(1)).subscribe(
          myRes => {
            console.log("success", myRes);
            alert("הקורס נוסף בהצלחה!");
            this.router.navigate(['/allCourses']);
          }, err => {
            alert("ERROR!");
          }
        );
      }  catch (error) {
      // Handle errors from isUserExist
      console.error('Error checking user existence:', error);
    }
  }


  //   if (this.courseForm.valid) {
  //     console.log("course:",this.courseForm.value);
  //     this.router.navigate(['/allCourses']);
  //   }
  // }

 getCategories() {
    this.categories.getCategory().pipe(take(1)).subscribe(myRes => {
        this.category=myRes;
        console.log(this.category);
      }, err => {
        alert("ERROR!");
    });
}



}
