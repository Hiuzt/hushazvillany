import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
    showDeleteDialog: boolean = false;
    showAddDialog: boolean = false;
    showEditDialog: boolean = false;
    currentActionIndex: string = ""

    usersList: any[] = [];

    userInputs: any = {
        "userName": "",
        "userEmail": "",
        "userFullName": "",
        "userPassword": "",
        "userPassword2": "",
    }

    constructor(private httpClient: HttpClient, private userService: UserService, private toast: NgToastService) { }

    ngOnInit(): void {
        this.fetchData();
    }

    editUser() {
        if (this.currentActionIndex !== "") {
            var passwordValue = ""
            if (this.userInputs.userPassword.length > 0) {
                passwordValue = this.userInputs.userPassword
            }
            const userData = {
                "name": this.userInputs.userFullName,
                "email": this.userInputs.userEmail,
                "password": passwordValue,
                "username": this.userInputs.userName
            }

            this.userService.updateUser(this.currentActionIndex, userData).subscribe((data) => {
                if (data.success === true) {
                    this.toast.success({detail: "Siker", summary: data.message})
                    this.showEditDialog = false;
                    this.fetchData();
                } else {
                    this.toast.error({detail: "Hiba", summary: data.message})            }
            })
        }
    }

    showEditUser() {
        if (this.currentActionIndex !== "") {
            const userSource = this.usersList.filter((userValue) => {
                return userValue._id === this.currentActionIndex;
            })[0]
            this.userInputs.userFullName = userSource["name"]
            this.userInputs.userEmail = userSource["email"]
            this.userInputs.userName = userSource["username"]

            this.showEditDialog = true
        }        
    }

    addUser() {
        // FORM VALIDATION

        const userForm = {
            "name": this.userInputs.userFullName,
            "email": this.userInputs.userEmail,
            "password": this.userInputs.userPassword,
            "username": this.userInputs.userName
        }

        this.userService.addUser(userForm).subscribe((data) => {
            if (data.success === true) {
                this.toast.success({detail: "Siker", summary: "Sikeresen létrehoztál egy felhasználót"})
                this.fetchData()
                this.showAddDialog = false;
            }
        })
    }

    deleteUser() {
        if (this.currentActionIndex !== "") {
            this.userService.deleteUser(this.currentActionIndex).subscribe((data) => {
                if (data.success === true) {
                    this.toast.success({detail: "Siker", summary: data?.data?.message})
                    this.fetchData();
                    this.showDeleteDialog = false;
                }
            })
        }
    }

    formatDateString(dateString: any): string {
        const date = new Date(dateString);      
        return  date.getFullYear() + ". " + ("0" + (date.getMonth() + 1)).slice(-2) +". " + ("0" + date.getDate()).slice(-2) + ". " + ("0" + date.getHours()).slice(-2) +":" + ("0" + date.getMinutes()).slice(-2);
      }


    fetchData() {
        this.userService.getAllUsers().subscribe((data: any) => {
            this.usersList = data.users;
        })
    }
}
