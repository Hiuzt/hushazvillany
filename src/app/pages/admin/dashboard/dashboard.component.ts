import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CountUpModule } from 'ngx-countup';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

    chartOptions: any;
    countUpOptions = { duration: 3 }
    productList = []

    allProducts = 0;
    discountProducts = 0;

    dataValues: any[][] = [
        ["Összes látogató", 73242],
        ["Heti látogatók száma", 1400],
        ["Napi látogatók száma", 170],
        ["Összes termék", this.allProducts],
        ["Összes akciós termék", 14],
    ]



    constructor(private httpClient: HttpClient) {
        this.chartOptions = {
            zoom: {
                enabled: false
            },
            series: [{
                name: 'Views',
                data: [2000, 1400, 2300, 5000, 1000, 4000, 2000, 1400, 2300, 5000, 1000, 4000]
            }],
            chart: {
                height: 350,
                type: 'line',
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
            },
            toolbar: {
                show: false  // Hide the toolbar icons
            }
        };
    }

    async ngOnInit(): Promise<void> {
        await this.httpClient.get("https://localhost:7228/api/Product/").subscribe((data: any) => {
            this.productList = data; 
            this.dataValues[3][1] = Number(this.productList.length)

            this.dataValues[4][1] = this.productList.filter((productValue) => {
                return productValue["discount"] > 0
            }).length
        })
        
        
    }
}
