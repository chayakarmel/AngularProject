import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import {  take } from 'rxjs';
import Category from '../../../models/Category';
import { Course } from '../../../models/Course';
import { CourseService } from '../../services/course.service';
@Component({
  selector: 'app-edit-course',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.scss'
})
export class EditCourseComponent implements OnInit{
  oneCourse: Course={
    courseName: "Math",
      categoryId: 2,
      numberOfLessons: 12,
      startDate: new Date(2023, 5, 20),
      syllabus: ["hgf", "nhbvc"],
      modeId:1,
      lecturerId: 160,
      imagePath: "VBN",
  };

  
    id:number=1;

  courseForm: FormGroup = new FormGroup({});
  category:Category[]=[];
  constructor(private fb: FormBuilder,private route: ActivatedRoute, private router: Router,private categories: CategoryService,private course:CourseService) { }



  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const data = params['data'];
      if (data) {
        
        this.oneCourse = JSON.parse(data);
        this.id=JSON.parse(data).courseId;
        console.log("object",this.oneCourse);
      }
    });
    
    this.courseForm = this.fb.group({
      courseName: [this.oneCourse.courseName, Validators.required],
      categoryId: [this.oneCourse.categoryId, Validators.required],
      numberOfLessons: [this.oneCourse.numberOfLessons, Validators.required],
      startDate: [this.oneCourse.startDate, Validators.required],
      // syllabus: this.fb.array(['', Validators.required]),
       syllabus: [this.oneCourse.syllabus], 
      learningMode: [this.oneCourse.modeId, Validators.required],
      lecturerId: [this.oneCourse.lecturerId, Validators.required],
      imagePath: [this.oneCourse.imagePath]
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
  saveEditCourse() {
    try {
        const data: Course = {
          courseId:this.id,
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
        this.course.updateCourse(this.id,data).pipe(take(1)).subscribe(
          myRes => {
            console.log("success", myRes);
            alert("הקורס עודכן בהצלחה!");
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

 getCategories() {
    this.categories.getCategory().pipe(take(1)).subscribe(myRes => {
        this.category=myRes;
        console.log(this.category);
      }, err => {
        alert("ERROR!");
    });
}
}

