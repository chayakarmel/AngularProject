import { Component, Input } from '@angular/core';
import { Course } from '../../../models/Course';
import { LearningMode } from '../../../models/LearningMode.enum';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent {

  @Input()
  oneCourse: Course =
    {
      courseId: 2,
      courseName: "Math",
      categoryId: 2,
      numberOfLessons: 12,
      startDate: new Date(2023, 5, 20),
      syllabus: ["hgf", "nhbvc"],
      learningMode: LearningMode.Zoom,
      lecturerId: 160,
      imagePath: "VBN",
    }

    

}
