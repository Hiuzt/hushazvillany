import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getAllProducts(): Observable<any> {
        return this.http.get<any>('https://localhost:7228/api/Product/', { withCredentials: true });
    }

    addNewProduct(productForm: any): Observable<any> {
        return this.http.post<any>('https://localhost:7228/api/Product/', productForm, {withCredentials: true})
    }

    deleteProduct(productID: number): Observable<any> {
        return this.http.delete<any>(`https://localhost:7228/api/Product/${productID}`, {withCredentials: true})
    }

    updateProduct(productID: number, productForm: any): Observable<any> {
        return this.http.put<any>(`https://localhost:7228/api/Product/${productID}`, productForm, {withCredentials: true})
    }
}