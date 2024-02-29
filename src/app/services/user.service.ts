import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/user`, { withCredentials: true });
    }

    deleteUser(userID: string): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/user/${userID}`, {withCredentials: true})
    }

    addUser(userData: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/user`, userData, {withCredentials: true})
    }  

    updateUser(userID: string, userData: any): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/user/${userID}`, userData, {withCredentials: true})
    }
}
