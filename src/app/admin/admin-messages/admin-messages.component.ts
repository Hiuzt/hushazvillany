import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute } from '@angular/router';
import { formatDateString } from '../../utils/utils';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrl: './admin-messages.component.css'
})
export class AdminMessagesComponent implements OnInit {
    currentPage: any = 1;
    pagesList: any;
    totalItems: number = 0;
    itemsPerPage: number = 12;

    messageList: any = []
    showResponseModal: boolean = false;
    currentResponseID: string = ""
    currentMessageSource: any = []
    replyContent: string = ""

    formatDate = formatDateString;

    constructor(private message: MessageService, private toast: NgToastService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.message.getAllMessage().subscribe((data) => {
            this.messageList = data.messages;
            this.totalItems = Math.ceil(this.messageList.length / this.itemsPerPage);
            this.pagesList = Array.from({ length: this.totalItems }, (_, i) => i + 1);

            this.messageList.sort((a: any, b: any) => {
                if (a.is_replied === b.is_replied) return 0;
                if (a.is_replied === false) return -1;
                return a.createdAt - b.createdAt;
            })
        });

        this.route.queryParams.subscribe(params => {
            this.currentPage = Number(params["page"]) || 1;
        });
        
    }

    replyMessage() {
        if (this.replyContent !== "") {
            const currentID = this.currentMessageSource["_id"]
            this.currentMessageSource["reply_message"] = this.replyContent

            this.message.replyMessage(currentID, this.currentMessageSource).subscribe((data) => {
                if (data.success === true) {
                    this.currentMessageSource["is_replied"] = true
                    this.currentMessageSource["reply_message"] = this.replyContent
                    this.message.getAllMessage(true)
                    this.toast.success({detail: "Siker", summary: data.message})
                }
            })        
        }
    }

    get unreadMessages() {
        return this.messageList.filter((data: any) => {
            return data["is_replied"] === false
        })
    }

    responseClick(currentResponseID: string): void {
        this.showResponseModal = true
        this.currentResponseID = currentResponseID

        this.currentMessageSource = this.messageList.filter((messageValue: any) => {
            return messageValue["_id"] === this.currentResponseID
        })[0]

        console.log(this.currentMessageSource)
    }

    adjustTextareaHeight(event: any): void {
        const textarea = event.target;
        textarea.style.height = 'auto'; // Reset the height to auto
        textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to fit the content
    }

    get paginatedList() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage
        const endIndex = (this.currentPage) * this.itemsPerPage

        return this.messageList.slice(startIndex, endIndex)
    }


    getCurrentMaxPage(currentPage: number) {
        return Math.min(currentPage * this.itemsPerPage, this.messageList.length)
    }

    getPrevPage(currentPage: number) {
        return Math.max(currentPage - 1, 1)
    }

    getNextPage(currentPage: number) {
        return Math.min(currentPage + 1, Math.round(this.messageList.length/this.itemsPerPage))
    }

   

}
