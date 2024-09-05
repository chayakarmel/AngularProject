import { Course } from '../../../models/Course';
import {ChangeDetectionStrategy, Component,Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { GetModePipe } from '../../pipes/get-mode.pipe';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [MatIconModule,MatCardModule, MatButtonModule,GetModePipe],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent {
  constructor( private router: Router){}
  @Input()
  oneCourse: Course =
    {
      courseName: "Math",
      categoryId: 2,
      numberOfLessons: 12,
      startDate: new Date(2023, 5, 20),
      syllabus: ["hgf", "nhbvc"],
      modeId:1,
      lecturerId: 160,
      imagePath: "VBN",
    }

    update(){
      // this.router.navigate(['/EditCourse',this.oneCourse.courseName]);
      const myObjectJson = JSON.stringify(this.oneCourse);
      this.router.navigate(['/EditCourse'], { queryParams: { data: myObjectJson } });
    }  

}
