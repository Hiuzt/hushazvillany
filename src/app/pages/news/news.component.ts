import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
    constructor(private news: NewsService) {}

    ngOnInit(): void {
        this.fetchData();
    }

    newsList: any = []

    replaceNewlinesWithBreaks(text: string): string {
        return text.replace(/\n/g, '<br/>');
    }

    fetchData() {
        this.news.getAllNews().subscribe((data: any) => {
            this.newsList = data.news;      
        }) 
    }

}
