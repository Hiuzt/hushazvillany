import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    constructor(private http: HttpClient) { }

    getAllNews(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/news`, { withCredentials: true });
    }

    deleteNews(newID: String): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/news/${newID}`, {withCredentials: true})
    }

    addNews(newsForm: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/news`, newsForm, {withCredentials: true})
    }

    editNews(newID: String, newsForm: any): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/news/${newID}`, newsForm, {withCredentials: true})
    }
}
