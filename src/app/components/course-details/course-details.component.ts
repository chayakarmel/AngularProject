import { Course } from '../../../models/Course';
import {ChangeDetectionStrategy, Component,Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
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
      modeId:"1",
      lecturerId: 160,
      imagePath: "VBN",
    }

   
    

}
