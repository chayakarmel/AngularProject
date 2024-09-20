import { Pipe, PipeTransform } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import Category from '../../models/Category';

@Pipe({
  name: 'getCategory',
  standalone: true
})
export class GetCategoryPipe implements PipeTransform {
  constructor(private categoryService: CategoryService) {}
  category?:Category;
  transform(code: number): Observable<string> {
    return this.categoryService.getCategory().pipe(
      map((categories: Category[]) => {
         this.category = categories.find(cat => cat.categoryId === code);
        console.log("cstegory",this.category?.iconPath);
        
        return this.category ? this.category.iconPath : 'לא נמצא';
      }),
      catchError(() => of('שגיאה בטעינה'))
      // במקרה של שגיאה
    );
   
  }
}
