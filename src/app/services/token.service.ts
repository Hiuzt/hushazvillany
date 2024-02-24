import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    
    jwtToken: any;
    decodedToken!: { [key: string]: string };
    constructor() {
        this.jwtToken = localStorage.getItem("token");
    }

    storeToken(tokenValue: string) {
        localStorage.setItem("token", tokenValue)
    }

    getToken() {
        return localStorage.getItem("token")
    }

    decodeToken() {
        if (this.jwtToken) {
            this.decodedToken = jwtDecode(this.jwtToken);
        }
    }

    getUser() {
        this.decodeToken();   
        return {"name": this.decodedToken ? this.decodedToken["name"] : null, "email": this.decodedToken ? this.decodedToken["email"] : null};    
    }

    getExpiryTime() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken["exp"] : null;
    }

    isTokenExpired(): boolean {
        const expiryTime: number = Number(this.getExpiryTime());
        console.log(expiryTime)
        if (expiryTime) {
            return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
        } else {
            return false;
        }
    }

}
