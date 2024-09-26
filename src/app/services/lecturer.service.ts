
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Lecturer from '../../models/Lecturer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  BASE_URL = "https://localhost:7159/api/Lecturer";

  constructor(private myHttp: HttpClient) { }

  getLecturer():Observable<Lecturer[]>  {
    return this.myHttp.get<Lecturer[]>(`${this.BASE_URL}`);
  }

  addLecturer(data: Lecturer) {
    return this.myHttp.post<Lecturer>(`${this.BASE_URL}`, data);
  }

}



