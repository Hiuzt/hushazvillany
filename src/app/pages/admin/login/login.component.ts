import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    

    loginData: any = {
        username: "",
        password: ""
    }

    constructor (private authService: AuthService, private router: Router, private token: TokenService, private toast: NgToastService) {}

    loginUser() {
        this.authService.login(this.loginData.username, this.loginData.password).subscribe((res: any) => {
            if (res.success) {
                this.toast.success({detail: "SUCCESS", summary: "Sikeresen bejelentkeztél!"});
                this.token.storeToken(res.data.token)
                this.router.navigateByUrl("/admin/dashboard")
            }
        })
    }
}
