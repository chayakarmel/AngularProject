import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Lecturer from '../../models/Lecturer';
import { LecturerService } from '../services/lecturer.service';

@Pipe({
  name: 'getLecturer',
  standalone: true
})
export class GetLecturerPipe implements PipeTransform {

  constructor(private lecturerService: LecturerService) { }
  lecturer?: Lecturer;
  transform(code: number): Observable<string> {
    return this.lecturerService.getLecturer().pipe(
      map((lecturers: Lecturer[]) => {
        this.lecturer = lecturers.find(l => l.lecturerId === code);
        // console.log("cstegory", this.category?.name);

        return this.lecturer ? this.lecturer.name : 'לא נמצא';
      }),
      catchError(() => of('שגיאה בטעינה'))
      // במקרה של שגיאה
    );


  }
}
