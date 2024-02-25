import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageService {

    private cachedData: any;
    constructor(private http: HttpClient) { }

    insertMessage(messageForm: any): Observable<any> {
        return this.http.post<any>('https://localhost:7228/api/Message/', messageForm, { withCredentials: true });
    }

    getAllMessage(): Observable<any> {
        if (this.cachedData) {
            return of(this.cachedData)
        } else {
            return this.http.get<any>('https://localhost:7228/api/Message/', {withCredentials: true}).pipe(
                tap(data => {
                    this.cachedData = data;
                })
            )
        }
    }
}
