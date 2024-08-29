import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss'
})

export class AddCourseComponent {
  courseForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router) { }



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
      console.log(this.courseForm.value);
      this.router.navigate(['/allCourses']);
    }
  }


}
