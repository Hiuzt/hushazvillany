import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    route: any;
    showMobileNavBar: boolean = false;
    menus: string[][] = [
        ["Főoldal", "/", "home.svg"],
        // ["Rólunk", "/about"],
        ["Híreink", "/news", "news.svg"],
        ["Termékeink", "/products", "products.svg"],
        ["Elérhetőségünk", "/contacts", "contacts.svg"]
    ];

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.events.subscribe((routerValue) => {
            this.route = this.router.url;
            console.log(this.route)
        })
    }

}
