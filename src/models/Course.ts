import { LearningMode } from './LearningMode.enum'; 

export class Course {
  courseId?:number;
  courseName: string;
  categoryId: number;
  numberOfLessons: number;
  startDate: Date;
  syllabus: string[]; 
  modeId: number; 
  lecturerId: number;
  imagePath: string;

  constructor(
    courseName: string,
    categoryId: number,
    numberOfLessons: number,
    startDate: Date,
    syllabus: string[],
    modeId: number,
    lecturerId: number,
    imagePath: string
  ) {
    this.courseName = courseName;
    this.categoryId = categoryId;
    this.numberOfLessons = numberOfLessons;
    this.startDate = startDate;
    this.syllabus = syllabus;
    this.modeId = modeId;
    this.lecturerId = lecturerId;
    this.imagePath = imagePath;
  }
}