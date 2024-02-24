import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../services/token.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
    constructor (private token: TokenService, private user: UserService, private router: Router, private toast: NgToastService) {}
    userSource: any;

    showMobileNavBar: boolean = false;

    ngOnInit(): void {
        this.userSource = this.token.getUser();
    }

    sidebarMenus: any[][] = [
        ["Összegzés", "assets/images/icons/summary.svg", "admin/dashboard"],
        ["Termékek", "assets/images/icons/products.svg", "admin/products"],
        ["Felhasználók", "assets/images/icons/users.svg", "admin/users"],
        ["Képek", "assets/images/icons/users.svg"]
    ]

    userLogout() {
        localStorage.removeItem("token");
        this.router.navigate(["admin/login"]);
        this.toast.info({detail: "Info", summary: "Sikeresen kijelentkeztél"})
    }
}
