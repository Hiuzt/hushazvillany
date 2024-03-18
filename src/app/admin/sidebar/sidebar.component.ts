import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MessageService } from '../../services/message.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
    constructor (private token: TokenService, private user: UserService, private router: Router, private toast: NgToastService, private message: MessageService) {}
    userSource: any;
    messageList: any;
    newMessage = 0;

    showMobileNavBar: boolean = false;

    ngOnInit(): void {
        this.userSource = this.token.getUser();
        this.message.getAllMessage().subscribe((data) => {
            this.messageList = data;
            this.getNewMessages();
        })
    }

    getNewMessages(): void {
        if (this.messageList?.length > 0) {
            this.newMessage = this.messageList.filter((data: any) => {
                return data["isReplied"] === false
            })?.length
        }        
    }

    sidebarMenus: any[][] = [
        ["Összegzés", "assets/images/icons/summary.svg", "admin/dashboard"],
        ["Termékek", "assets/images/icons/products.svg", "admin/products"],
        ["Felhasználók", "assets/images/icons/users.svg", "admin/users"],
        ["Hirdetések", "assets/images/icons/news.svg", "admin/news"],
        ["Üzenetek", "assets/images/icons/messages.svg", "admin/messages"]
    ]

    userLogout() {
        localStorage.removeItem("token");
        this.router.navigate(["admin/login"]);
        this.toast.info({detail: "Info", summary: "Sikeresen kijelentkeztél"})
    }
}
