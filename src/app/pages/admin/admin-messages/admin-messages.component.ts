import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrl: './admin-messages.component.css'
})
export class AdminMessagesComponent implements OnInit {
    messageList: any = []
    showResponseModal: boolean = false;
    currentResponseID = -1

    constructor(private message: MessageService) {}

    ngOnInit(): void {
        this.message.getAllMessage().subscribe((data) => {
            this.messageList = data
        })
    }

    get unreadMessages() {
        return this.messageList.filter((data: any) => {
            return data["isReplied"] === false
        })
    }

    responseClick(currentResponseID: number): void {
        this.showResponseModal = true
        this.currentResponseID = currentResponseID
    }

    adjustTextareaHeight(event: any): void {
        const textarea = event.target;
        textarea.style.height = 'auto'; // Reset the height to auto
        textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to fit the content
      }
}
