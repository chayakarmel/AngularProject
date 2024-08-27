import { Component } from '@angular/core';
import { Course } from '../../../models/Course';
import { LearningMode } from '../../../models/LearningMode.enum';
import { CourseDetailsComponent } from '../course-details/course-details.component';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [CourseDetailsComponent],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.scss'
})
export class AllCoursesComponent {

  courses: Course[] = [{
    courseId: 1,
    courseName: "English",
    categoryId: 33,
    numberOfLessons: 10,
    startDate: new Date(2024, 7, 20),
    syllabus: ["gfde", "jyhtgrfed"],
    learningMode: LearningMode.InPerson,
    lecturerId: 150,
    imagePath: "fvghjk",
  },
  {
    courseId: 2,
    courseName: "Math",
    categoryId: 2,
    numberOfLessons: 12,
    startDate: new Date(2023,5, 20),
    syllabus: ["hgf", "nhbvc"],
    learningMode: LearningMode.Zoom,
    lecturerId: 160,
    imagePath: "VBN",
  },
  {
    courseId: 4,
    courseName: "java",
    categoryId: 20,
    numberOfLessons: 5,
    startDate: new Date(2022, 6, 3),
    syllabus: ["jhgf", "jyhg","kjhgf"],
    learningMode: LearningMode.InPerson,
    lecturerId: 20,
    imagePath: "kjuhy",
  }]



}
