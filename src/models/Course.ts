import { LearningMode } from './LearningMode.enum'; 

export class Course {
  courseId: number;
  courseName: string;
  categoryId: number;
  numberOfLessons: number;
  startDate: Date;
  syllabus: string[]; 
  learningMode: LearningMode; 
  lecturerId: number;
  imagePath: string;

  constructor(
    courseId: number,
    courseName: string,
    categoryId: number,
    numberOfLessons: number,
    startDate: Date,
    syllabus: string[],
    learningMode: LearningMode,
    lecturerId: number,
    imagePath: string
  ) {
    this.courseId = courseId;
    this.courseName = courseName;
    this.categoryId = categoryId;
    this.numberOfLessons = numberOfLessons;
    this.startDate = startDate;
    this.syllabus = syllabus;
    this.learningMode = learningMode;
    this.lecturerId = lecturerId;
    this.imagePath = imagePath;
  }
}