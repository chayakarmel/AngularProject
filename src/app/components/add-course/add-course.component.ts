import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import {  take } from 'rxjs';
import Category from '../../../models/Category';
import { Course } from '../../../models/Course';
import { CourseService } from '../../services/course.service';
import Swal from 'sweetalert2';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,MatFormFieldModule,MatOption,MatIcon,  ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,MatNativeDateModule,MatDatepickerModule],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent {
  courseForm: FormGroup = new FormGroup({});
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      categoryId: ['', Validators.required],
      numberOfLessons: ['', Validators.required],
      startDate: ['', Validators.required],
       syllabus: this.fb.array(['']),
       // syllabus: [''], 
      learningMode: ['', Validators.required],
      lecturerId: ['', Validators.required],
      imagePath: ['']
    });
    this.getCategories();  }

  // get syllabus(): FormArray {
  //   return this.courseForm.get('syllabus') as FormArray;
  // }

  get syllabus() {
    return this.courseForm.get('syllabus') as FormArray;
  }


  addSyllabus() {
    this.syllabus.push(this.fb.control(''));
  }

  // removeSyllabus(index: number): void {
  //   this.syllabus.removeAt(index);
  // }

  
  removeSyllabus(index: number) {
    if (this.syllabus.length > 1) {
      this.syllabus.removeAt(index);
    }
  }

  getCategories() {
    this.categoryService.getCategory().pipe(take(1)).subscribe(myRes => {
      this.categories = myRes;
    }, err => {
      Swal.fire({
        text: 'שגיאה בטעינת הקטגוריות',
        icon: 'error',
      });
    });
  }

  // onInputChange(index: number) {
  //   const control = this.syllabus.at(index);
  //   if (control.value === '') {
  //     this.removeSyllabus(index);
  //   }
  // }

  saveNewCourse() {
    if (this.courseForm.valid) {
      const arr = this.courseForm.get('syllabus')?.value.filter((field: string) => field.trim() !== '');
  
      if (arr.length === 0) {
        Swal.fire('Error!', 'The syllabus cannot be empty.', 'error');
        return;
      }
      const syllabus = arr.join(';');
      console.log(syllabus);
      
      const data: Course = {
        courseName: this.courseForm.get('courseName')!.value,
        categoryId: this.courseForm.get('categoryId')?.value,
        numberOfLessons: this.courseForm.get('numberOfLessons')!.value,
        startDate: this.courseForm.get('startDate')!.value,
         syllabus,
        modeId: this.courseForm.get('learningMode')!.value,
        lecturerId: this.courseForm.get('lecturerId')!.value,
        imagePath: this.courseForm.get('imagePath')!.value,
      };
      console.log(data)
      this.courseService.createCourse(data).pipe(take(1)).subscribe(
        
        myRes => {
          
          Swal.fire({
            text: 'הקורס נוסף בהצלחה!',
            icon: 'success',
          }).then(() => {
            this.router.navigate(['/allCourses']);
          });
        }, err => {
          
          Swal.fire({
            text: 'שגיאה בהוספת הקורס',
            icon: 'error',
          });
        }
      );
    } else {
      Swal.fire({
        text: 'נא למלא את כל השדות הנדרשים',
        icon: 'warning',
      });
    }
  }


}
