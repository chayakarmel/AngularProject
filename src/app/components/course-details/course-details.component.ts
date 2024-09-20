import { Course } from '../../../models/Course';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { GetModePipe } from '../../pipes/get-mode.pipe';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GetCategoryPipe } from '../../pipes/get-category.pipe';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule,MatIconModule, MatCardModule, MatButtonModule, GetModePipe,GetCategoryPipe],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent {
 color :string="";

  constructor(private router: Router) { }

  @Input()
  oneCourse: Course =
    {
      courseName: "Math",
      categoryId: 2,
      numberOfLessons: 12,
      startDate: new Date(2023, 5, 20),
      syllabus: ["hgf", "nhbvc"],
      modeId: 1,
      lecturerId: 160,
      imagePath: "VBN",
    }

  update() {
    // this.router.navigate(['/EditCourse',this.oneCourse.courseName]);
    const myObjectJson = JSON.stringify(this.oneCourse);
    this.router.navigate(['/EditCourse'], { queryParams: { data: myObjectJson } });
  }

  lecturerId:string = sessionStorage.getItem('lecturerId') || "";
  coursesLecturer(): boolean {
   
    if ( this.lecturerId!=""&& Number(this.lecturerId) === this.oneCourse.lecturerId)
      return true;
    else 
      return false;
  }

  closerDate(): boolean {
    const today = new Date();
    
    // התחלת השבוע הנוכחי
    const startOfThisWeek = new Date(today);
    startOfThisWeek.setDate(today.getDate() - today.getDay()); // חישוב התאריך הראשון של השבוע
    startOfThisWeek.setHours(0, 0, 0, 0);
    
    // סוף השבוע הנוכחי
    const endOfThisWeek = new Date(startOfThisWeek);
    endOfThisWeek.setDate(startOfThisWeek.getDate() + 6);
    endOfThisWeek.setHours(23, 59, 59, 999);
    
    const courseStartDate = new Date(this.oneCourse.startDate);
  
    // בדוק אם התאריך הוא בשבוע הנוכחי
    return courseStartDate >= startOfThisWeek && courseStartDate <= endOfThisWeek;
  }
  
  

}

