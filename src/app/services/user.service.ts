import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/api/User`, { withCredentials: true });
    }

    deleteUser(userID: number): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/api/User/${userID}`, {withCredentials: true})
    }

    addUser(userData: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/api/User/Register`, userData, {withCredentials: true})
    }  

    updateUser(userID: number, userForm: any): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/api/User${userID}`, userForm, {withCredentials: true})
    }
}
