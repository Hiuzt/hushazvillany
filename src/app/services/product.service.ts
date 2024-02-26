import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    async getAllProducts(): Promise<Observable<any>> {
        return await this.http.get<any>(`${environment.apiUrl}/api/Product/`, { withCredentials: true });
    }

    addNewProduct(productForm: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/api/Product/`, productForm, {withCredentials: true})
    }

    deleteProduct(productID: number): Observable<any> {
        return this.http.delete<any>(`${environment.apiUrl}/api/Product/${productID}`, {withCredentials: true})
    }

    updateProduct(productID: number, productForm: any): Observable<any> {
        return this.http.put<any>(`${environment.apiUrl}/api/Product/${productID}`, productForm, {withCredentials: true})
    }
}
