import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private token: TokenService) { }

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password }, {withCredentials: true});
    }

    isLoggedIn(): boolean {
        return !!this.token.getToken()
    }

    async getServerToken(): Promise<boolean> {
        this.http.get<any>(`${environment.apiUrl}/auth/loggedIn`, {withCredentials: true}).subscribe((e) => {
            return e.data.loggedIn;
        })

        return false
    }
}
