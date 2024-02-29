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
    replyContent: string = ""

    constructor(private message: MessageService) {}

    ngOnInit(): void {
        this.message.getAllMessage().subscribe((data) => {
            this.messageList = data.messages
        })
    }

    replyMessage() {
        if (this.replyContent !== "") {
            const currentID = this.messageList[this.currentResponseID]["id"]
            let currentImageSource = this.messageList[this.currentResponseID]
            currentImageSource["reply_content"] = this.replyContent

            this.message.replyMessage(currentID, currentImageSource).subscribe((data) => {
                if (data.success === true) {
                    this.messageList[this.currentResponseID]["is_replied"] = true
                    this.messageList[this.currentResponseID]["reply_content"] = this.replyContent
                    this.message.getAllMessage(true)
                }
            })        
        }
    }

    get unreadMessages() {
        return this.messageList.filter((data: any) => {
            return data["is_replied"] === false
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
