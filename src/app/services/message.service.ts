import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private cachedData: any;
    constructor(private http: HttpClient) { }

    insertMessage(messageForm: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/message/`, messageForm, { withCredentials: true });
    }

    getAllMessage(forceGet: boolean = false): Observable<any> {
        if (this.cachedData) {
            return of(this.cachedData)
        } else if (forceGet === true || !this.cachedData) {
            return this.http.get<any>(`${environment.apiUrl}/message/`, {withCredentials: true}).pipe(
                tap(data => {
                    this.cachedData = data;
                })
            )
        } else {
            return this.http.get<any>(`${environment.apiUrl}/message/`, {withCredentials: true}).pipe(
                tap(data => {
                    this.cachedData = data;
                })
            )           
        }
    }

    replyMessage(messageID: number, messageForm: any): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/message/${messageID}`, messageForm, { withCredentials: true });
    }
}
