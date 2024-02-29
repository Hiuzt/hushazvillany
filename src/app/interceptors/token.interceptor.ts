import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';


export const tokenInterceptor: HttpInterceptorFn = (req: any, next: any) => {
    let auth: AuthService
    let route: Router
    let modifiedReq: any
    
    try {
        const myToken = localStorage.getItem("auth_token");
        if (myToken) {
            modifiedReq = req.clone({
                setHeaders: { Authorization: `Bearer ${myToken}` }
            })
        }
        
        return next(modifiedReq).pipe(
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        route.navigate(['admin/login'])
                    }
                }
                return throwError(() => new Error("Szerverhiba"))
            })
        )
    } catch {
        return next(req)
    }
};
