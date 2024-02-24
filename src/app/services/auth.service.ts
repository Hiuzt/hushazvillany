import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient, private token: TokenService) { }

    login(username: string, password: string): Observable<any> {
        return this.http.post<any>('https://localhost:7228/api/User/Login', { username, password }, {withCredentials: true});
    }

    isLoggedIn(): boolean {
        return !!this.token.getToken()
    }

    async getServerToken(): Promise<boolean> {
        this.http.get<any>('https://localhost:7228/api/User/loggedIn', {withCredentials: true}).subscribe((e) => {
            return e.data.loggedIn;
        })

        return false
    }
}