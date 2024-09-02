import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import {  take } from 'rxjs';
import Category from '../../../models/Category';

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
  constructor(private fb: FormBuilder, private router: Router,private categories: CategoryService) { }



  ngOnInit() {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      categoryId: ['', Validators.required],
      numberOfLessons: ['', Validators.required],
      startDate: ['', Validators.required],
      syllabus: this.fb.array(['', Validators.required]),
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

  saveNewCourse(): void {
    if (this.courseForm.valid) {
      console.log("course:",this.courseForm.value);
      this.router.navigate(['/allCourses']);
    }
  }

 getCategories() {
    this.categories.getCategory().pipe(take(1)).subscribe(myRes => {
        this.category=myRes;
        console.log(this.category);
      }, err => {
        alert("ERROR!");
    });
}



}
