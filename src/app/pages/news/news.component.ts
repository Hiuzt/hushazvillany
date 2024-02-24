import { Component } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
    replaceNewlinesWithBreaks(text: string): string {
        return text.replace(/\n/g, '<br/>');
    }

    a = `⬇️🎄🐷
    2023. 12. 23. (szombat): 07:00-11:00
    2023. 12. 24. (vasárnap): ❌
    2023. 12. 25. (hétfő): ❌
    2023. 12. 26. (kedd): ❌
    2023. 12. 27. (szerda): ❌
    2023. 12. 28. (csütörtök): 07:30-16:00
    2023. 12. 29. (péntek): 07:30-16:00
    2023. 12. 30. (szombat): 07:00-11:00
    2023. 12. 31. (vasárnap): ❌
    2024. 01. 01. (hétfő): ❌
    2024. 01. 02. (kedd): ❌
    2024. 01. 03. (szerda): ❌
    2024. 01. 04 (csütörtök): ➡️ Megszokott nyitvatartás szerint.
    Kellemes ünnepeket kívánunk!🎄❤️`
    newsList: any[] = [
        ["Ünnepi nyitvatartás", "news_test.jpg", 1, this.a],
        ["Heti akcióink", "news_test2.jpg", 1, "Heti akcióink, a készlet erejéig tart"]
       
    ]
}
