import { Component, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { formatDateString } from '../../utils/utils';
import { NgToastService } from 'ng-angular-popup';

@Component({
    selector: 'app-admin-news',
    templateUrl: './admin-news.component.html',
    styleUrl: './admin-news.component.css'
})
export class AdminNewsComponent {
    
    constructor(private news: NewsService, private toast: NgToastService) { }
    formatDate = formatDateString;
    uploadedImage: any = null;
  
    ngOnInit(): void {
        this.fetchData();
    }

    newsInput: any = {
        description: "",
        image: "",
        title: ""
    }

    addNewNews() {
        this.currentModal = 0
        const formData = new FormData();
        formData.append("text", this.newsInput.description);   
        formData.append("title", this.newsInput.title);   
        formData.append("image", this.newsInput.image);  

    
        this.news.addNews(formData).subscribe((data) => {
            if (data.success === true) {
                this.toast.success({detail: "Siker", summary: "Sikeresen hozzáadtál a listához egy hirdetést!"});
                this.currentModal = 0;
                this.fetchData();
            }
        })     
    }

    clearInputs() {
        this.newsInput.description = ""
        this.newsInput.image = ""
        this.newsInput.title = ""
        this.uploadedImage = null
    }


    handleEnter(event: any) {
        if (event.which === 13) {
            event.preventDefault();
            this.newsInput.description = this.newsInput.description + "\n";
        }
    }


    currentModal: number = 0
    currentActionID: any = ""
    currentNew: any = []
    newsList: any = []

    deleteNew() {
        if (this.currentActionID != "") {
            this.news.deleteNews(this.currentActionID).subscribe((data) => {
                if (data.success === true) {
                    this.toast.success({detail: "Siker", summary: "Sikeresen töröltél egy hirdetést"})
                    this.fetchData()
                }
            })
        }
        this.currentModal = 0   
    }

    showEditNews(indexValue: any) {
        this.currentActionID = indexValue
        var currentNews = this.newsList.filter((newsValue: any) => {
            return newsValue["_id"] === indexValue;
        })
        
        this.currentModal = 4
        if (currentNews) {
            this.newsInput.title = currentNews[0]["title"]
            this.newsInput.description = currentNews[0]["text"]
            this.newsInput.image = null
            this.uploadedImage = currentNews[0]["image"]
        }
    }

    editNews() {
        if (this.currentActionID != "") {
            const formData = new FormData();
            formData.append("text", this.newsInput.description);   
            formData.append("title", this.newsInput.title);   
            if (this.newsInput.image !== null) {
                formData.append("image", this.newsInput.image); 
            }
                 
            this.news.editNews(this.currentActionID, formData).subscribe((data) => {
                if (data.success === true) {
                    this.toast.success({detail: "Siker", summary: "Sikeresen szerkesztettél egy hirdetést"})
                    this.fetchData()
                }
            })
        }
        this.currentModal = 0   
    }

    replaceNewlinesWithBreaks(text: string): string {
        return text.replace(/\n/g, '<br/>');
    }


    fetchData() {
        this.news.getAllNews().subscribe((data: any) => {
            this.newsList = data.news;
        })
    }

    showDelete(clickedID: any): void {
        this.currentActionID = clickedID;
        this.currentModal = 3
    }
    

    showPreview(clickedID: any): void {
        this.currentNew = this.newsList.filter((newsData: any) => {
            return newsData["_id"] === clickedID
        })[0]

        this.currentActionID = clickedID;
        this.currentModal = 1
    }

    onFileUplaoded(event: any) {
        const selectedFile: File = event.target.files[0];
        if (selectedFile) {
            this.newsInput.image = selectedFile
            this.uploadedImage = URL.createObjectURL(selectedFile)
        }
    }

}
