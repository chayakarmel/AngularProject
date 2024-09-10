import { Course } from '../../../models/Course';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { GetModePipe } from '../../pipes/get-mode.pipe';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule,MatIconModule, MatCardModule, MatButtonModule, GetModePipe],
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

  closerDate():boolean{
    // התאריך של היום
    const today = new Date();
    
    // התחלת השבוע הקרוב (תחילת השבוע הנוכחי + 7 ימים)
    const startOfNextWeek = new Date(today);
    startOfNextWeek.setDate(today.getDate() + 7);
    startOfNextWeek.setHours(0, 0, 0, 0); // לא כולל שעות, דקות ושניות
  
    // סוף השבוע הקרוב (תחילת השבוע הקרוב + 6 ימים)
    const endOfNextWeek = new Date(startOfNextWeek);
    endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);
    endOfNextWeek.setHours(23, 59, 59, 999); // כולל שעות, דקות ושניות
  
    // התאריך של ה-startDate מהקורס
    const courseStartDate = new Date(this.oneCourse.startDate);
  
    // בדוק אם התאריך הוא בשבוע הקרוב
    if (courseStartDate >= startOfNextWeek && courseStartDate <= endOfNextWeek) {
      return true;
    } else {
      return false; // או צבע אחר כדי לסמן תוצאה אחרת
    }
  }

}

