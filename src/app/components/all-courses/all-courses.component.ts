// // import { Component, OnInit } from '@angular/core';
// // import { FormBuilder, FormGroup } from '@angular/forms';
// // import { Course } from '../../../models/Course';
// // import { CourseService } from '../../services/course.service';
// // import { CourseDetailsComponent } from '../course-details/course-details.component';
// // import { take } from 'rxjs';

// // @Component({
// //   selector: 'app-all-courses',
// //   standalone: true,
// //   imports: [CourseDetailsComponent],
// //   templateUrl: './all-courses.component.html',
// //   styleUrls: ['./all-courses.component.scss']
// // })
// // export class AllCoursesComponent implements OnInit {
// //   courses: Course[] = [];
// //   filteredCourses: Course[] = [];
// //   textValue:string="";
// //   constructor(private courseService: CourseService) {
  
// //   }

// //   onInputChange(event: Event): void {
// //     const inputElement = event.target as HTMLInputElement;
// //     this.textValue = inputElement.value;
// //     console.log(this.textValue); // כדי לראות את הערך המלא
// //   }

// //   ngOnInit() {
// //     this.loadCourses();
   
// //   }

// //   loadCourses() {
// //     this.courseService.getCourses().pipe(take(1)).subscribe(myRes => {
// //       this.courses = myRes;
// //       this.filteredCourses = this.courses; // Initialize with all courses
// //     }, err => {
// //       alert("ERROR!");
// //     });
// //   }

  
// // }

// import { Component, OnInit } from '@angular/core';
// import { Course } from '../../../models/Course';
// import { CourseService } from '../../services/course.service';
// import { take } from 'rxjs';
// import { CourseDetailsComponent } from '../course-details/course-details.component';
// import { CommonModule } from '@angular/common';
// import { CategoryService } from '../../services/category.service';
// import Category from '../../../models/Category';

// @Component({
//   selector: 'app-all-courses',
//     standalone: true,
//     imports: [CourseDetailsComponent,CommonModule],
//     templateUrl: './all-courses.component.html',
//     styleUrls: ['./all-courses.component.scss']
// })
// export class AllCoursesComponent implements OnInit {
//   courses: Course[] = [];
//   category:Category[]=[];
//   filteredCourses: Course[] = [];
//   courseNameFilter: string = '';

//   constructor(private courseService: CourseService,private categories: CategoryService) {}

//   ngOnInit() {
//     this.loadCourses();
//     this.getCategories();
//   }

//   loadCourses() {
//     this.courseService.getCourses().pipe(take(1)).subscribe({
//       next: (myRes) => {
//         this.courses = myRes || [];  // אם myRes הוא null, אתן רשימה ריקה
//         this.filteredCourses = [...this.courses]; // Initialize with all courses
//         console.log("הקורסים:",myRes);
//       },
//       error: (err) => {
//         console.error("Error fetching courses:", err); 
//         this.courses = [];
//         this.filteredCourses = [];
//       }
//     });
//   }

//   filterCourses() {
//     if (this.courses) {
//       const filterValue = this.courseNameFilter.toLowerCase();
//       this.filteredCourses = this.courses.filter(course => 
//         course.courseName.toLowerCase().includes(filterValue)
//       );
//     }
//   }

//   onInputChange(event: Event): void {
//     const inputElement = event.target as HTMLInputElement;
//     this.courseNameFilter = inputElement.value;
//     this.filterCourses(); // סנן את הקורסים בכל שינוי
//   }
 

// getCategories() {
//   this.categories.getCategory().pipe(take(1)).subscribe(myRes => {
//       this.category=myRes;
//       console.log("הקטגוריות:",this.category);
//     }, err => {
//       alert("ERROR!");
//   });
// }


// }
import {MatSelectModule} from '@angular/material/select';
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

@Component({
  selector: 'app-all-courses',
  standalone: true,
  imports: [CourseDetailsComponent, CommonModule,MatFormFieldModule, MatInputModule, MatSelectModule],
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

  onLearningModeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLearningMode = selectElement.value;
    this.filterCourses();
  }


  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.courseNameFilter = inputElement.value;
    this.filterCourses();
  }

  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCategory = selectElement.value;
    console.log("selectedCategory",this.selectedCategory);
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

 // your-component.component.ts

  items = [
    {
      text: 'כנסים ואירועים',
      icon: 'https://www.johnbryce.co.il/wp-content/uploads/2023/06/shape-876@2x.png'
        },
    {
      text: 'קורסים למנהלים',
      icon: 'https://www.johnbryce.co.il/wp-content/uploads/2023/04/Star.svg'
    },
    {
      text: 'קורסי הכשרה לעולם ההייטק',
      icon: 'https://www.johnbryce.co.il/wp-content/uploads/2023/06/chair-i.png' },
    {
      text: 'קורסים מקצועיים למתקדמים',
      icon: 'https://www.johnbryce.co.il/wp-content/uploads/2023/05/5.png'}
  ];

  selectedItem: any = null;

  selectBox(item: any) {
    this.selectedItem = item;
  }

  isSelected(item: any): boolean {
    return this.selectedItem === item;
  }
}


