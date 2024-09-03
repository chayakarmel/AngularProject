import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../models/Course';




@Injectable({
  providedIn: 'root'
})
export class CourseService {
  //  users: User[] = [];

  BASE_URL = "https://localhost:7159/api/Course";

  constructor(private myHttp: HttpClient) { }

  getCourses():Observable<Course[]>  {
    return this.myHttp.get<Course[]>(`${this.BASE_URL}`);
  }
  // getUserById(id: number) {
  //   return this.myHttp.get<User>(`${this.BASE_URL}/${id}`);
  // }
  createCourse(data: Course) {
    return this.myHttp.post<Course>(`${this.BASE_URL}`, data);
  }

  
  // updateUser(id: number, data: User) {
  //   return this.myHttp.put<User>(`${this.BASE_URL}/update/${id}`,data);
  // }
  // deleteUser(id:number){
  //   return this.myHttp.delete(`${this.BASE_URL}/delete/${id}`);
  // }



  
}
