import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable, inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
    providedIn: 'root',
})

class LoginService {
    constructor(private auth: AuthService, private token: TokenService, private toast: NgToastService, private router: Router) {}

    canActivate(): boolean {
        if (this.auth.isLoggedIn()) {
            if (this.token.getUser()) {
                if (this.token.isTokenExpired()) {
                    this.router.navigateByUrl("/admin/login")
                    return false;
                }     
                return true;     
            } else {
                this.auth.getServerToken().then((e: any) => {
                    return true
                }).catch((e: any) => {
                    this.router.navigateByUrl("/admin/login")
                })
            }     
        }
        this.router.navigateByUrl("/admin/login")
        this.toast.error({detail: "Hiba", summary: "Nem vagy bejelentkezve"})
        return false;
    }
}

export const authGuard: CanActivateFn =  (route, state) => {
    return inject(LoginService).canActivate();
};