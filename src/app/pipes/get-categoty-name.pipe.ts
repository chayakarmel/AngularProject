import { Pipe, PipeTransform } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Category from '../../models/Category';

@Pipe({
  name: 'getCategotyName',
  standalone: true
})
export class GetCategotyNamePipe implements PipeTransform {

  constructor(private categoryService: CategoryService) { }
  category?: Category;
  transform(code: number): Observable<string> {
    return this.categoryService.getCategory().pipe(
      map((categories: Category[]) => {
        this.category = categories.find(cat => cat.categoryId === code);
        console.log("cstegory", this.category?.name);

        return this.category ? this.category.name : 'לא נמצא';
      }),
      catchError(() => of('שגיאה בטעינה'))
      // במקרה של שגיאה
    );


  }
}
