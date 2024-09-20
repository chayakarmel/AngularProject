import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const lecturerName = sessionStorage.getItem('lecturerName');
    const userName = sessionStorage.getItem('userName');

    // אם יש משתמש מחובר, אפשר לגשת לקומפוננטה
    if (lecturerName || userName) {
      return true;
    }

    // אחרת, נוודא שהמשתמש לא יכול לגשת ונחזיר אותו לדף הלוגין
    this.router.navigate(['/']);
    return false;
  }
}
