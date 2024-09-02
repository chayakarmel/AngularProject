import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Category from '../../models/Category';




@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories:Category[]=[]

  BASE_URL = "https://localhost:7159/api/Category";

  constructor(private myHttp: HttpClient) { }

  getCategory():Observable<Category[]>  {
    return this.myHttp.get<Category[]>(`${this.BASE_URL}`);
  }
  // getUserById(id: number) {
  //   return this.myHttp.get<User>(`${this.BASE_URL}/${id}`);
  // }
  // createUser(data: Category) {
  //   return this.myHttp.post<User>(`${this.BASE_URL}`, data);
  // }

  
  // updateUser(id: number, data: User) {
  //   return this.myHttp.put<User>(`${this.BASE_URL}/update/${id}`,data);
  // }
  // deleteUser(id:number){
  //   return this.myHttp.delete(`${this.BASE_URL}/delete/${id}`);
  // }



  
}
