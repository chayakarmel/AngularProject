import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Course } from '../../../models/Course';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-one-course',
  standalone: true,
  imports: [CommonModule,RouterLink,MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './one-course.component.html',
  styleUrl: './one-course.component.scss'
})
export class OneCourseComponent implements OnInit {
  arraySylabus: String[] = [];

  course: Course = {
    courseName: "Math",
    categoryId: 2,
    numberOfLessons: 12,
    startDate: new Date(2023, 5, 20),
    syllabus: ["hgf", "nhbvc"],
    modeId: 1,
    lecturerId: 160,
    imagePath: "VBN",
  };

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // קבלת המידע מהסטייט
    this.course = history.state.course;
    console.log(this.course, "course");
    // const a = JSON.parse(history.state.course.syllabus)
     this.arraySylabus = history.state.course.syllabus.split(';');
    // console.log(this.arraySylabus)
    console.log("syl",this.course.syllabus);
    
  }
  update() {
    // this.router.navigate(['/EditCourse',this.oneCourse.courseName]);
    const myObjectJson = JSON.stringify(this.course);
    this.router.navigate(['/EditCourse'], { queryParams: { data: myObjectJson } });
  }

  lecturerId:string = sessionStorage.getItem('lecturerId') || "";
  coursesLecturer(): boolean {
   
    if ( this.lecturerId!=""&& Number(this.lecturerId) === this.course.lecturerId)
      return true;
    else 
      return false;
  }
}
