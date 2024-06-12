import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // return true;
  
  console.log("auth status:"+authService.checkIsAuthenticated());
  if(authService.checkIsAuthenticated()){
    return true;
  }
  else{
    router.navigate(['/login']);
    return false;
  }
};


