import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getAllProducts(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/product`, { withCredentials: true });
    }

    addNewProduct(productForm: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/product`, productForm, {withCredentials: true})
    }

    deleteProduct(productID: string): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/Product/${productID}`, {withCredentials: true})
    }

    updateProduct(productID: string, productForm: any): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/Product/${productID}`, productForm, {withCredentials: true})
    }
}
