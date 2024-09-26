
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ChangeDetectionStrategy ,Component, OnInit } from '@angular/core';
import { Course } from '../../../models/Course';
import { CourseService } from '../../services/course.service';
import { take } from 'rxjs';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import Category from '../../../models/Category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [CourseDetailsComponent, CommonModule,MatFormFieldModule, MatInputModule,RouterLink,MatSelectModule],
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.scss'],
})
export class AllCoursesComponent implements OnInit {
  courses: Course[] = [];
  category: Category[] = [];
  filteredCourses: Course[] = [];
  courseNameFilter: string = '';
  selectedCategory: string = '';
  selectedLearningMode: string = '';



  constructor(private courseService: CourseService, private categories: CategoryService) {}

  ngOnInit() {
   
    this.loadCourses();
    this.getCategories();
  }


  loadCourses() {
    this.courseService.getCourses().pipe(take(1)).subscribe({
      next: (myRes) => {
        this.courses = myRes || [];
        this.filteredCourses = [...this.courses];
        console.log("הקורסים:", myRes);
      },
      error: (err) => {
        console.error("Error fetching courses:", err);
        this.courses = [];
        this.filteredCourses = [];
      }
    });
  }

  filterCourses() {
    console.log("סלקט",this.selectedLearningMode)
    console.log("מתוך השרת",this.courses[0].modeId)
    if (this.courses) {
      const filterValue = this.courseNameFilter.toLowerCase();
      this.filteredCourses = this.courses.filter(course => 
        course.courseName.toLowerCase().includes(filterValue) &&
        (this.selectedCategory ? course.categoryId === parseInt(this.selectedCategory) : true) &&
        (this.selectedLearningMode ? course.modeId.toString() === this.selectedLearningMode : true)
        
      );
    }
  }

  onCategoryChange(event: MatSelectChange): void {
    this.selectedCategory = event.value; // אין צורך בהמרה
    console.log("selectedCategory", this.selectedCategory);
    this.filterCourses();
}


  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.courseNameFilter = inputElement.value;
    this.filterCourses();
  }


  onLearningModeChange(event: MatSelectChange): void {
    this.selectedLearningMode = event.value; // אין צורך בהמרה
    this.filterCourses();
}

  getCategories() {
    this.categories.getCategory().pipe(take(1)).subscribe({
      next: (myRes) => {
        this.category = myRes;
        console.log("הקטגוריות:", this.category);
      },
      error: (err) => {
        console.error("Error fetching categories:", err);
        this.category = [];
      }
    });
  }
 
}


