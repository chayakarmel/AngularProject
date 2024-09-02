import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '../../models/User';




@Injectable({
  providedIn: 'root'
})
export class UserService {
   users: User[] = [];

  BASE_URL = "https://localhost:7159/api/Users";

  constructor(private myHttp: HttpClient) { }

  getUser():Observable<User[]>  {
    return this.myHttp.get<User[]>(`${this.BASE_URL}`);
  }
  // getUserById(id: number) {
  //   return this.myHttp.get<User>(`${this.BASE_URL}/${id}`);
  // }
  createUser(data: User) {
    return this.myHttp.post<User>(`${this.BASE_URL}`, data);
  }
  // updateUser(id: number, data: User) {
  //   return this.myHttp.put<User>(`${this.BASE_URL}/update/${id}`,data);
  // }
  // deleteUser(id:number){
  //   return this.myHttp.delete(`${this.BASE_URL}/delete/${id}`);
  // }



  
}
