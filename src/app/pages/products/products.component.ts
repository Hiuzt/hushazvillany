import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ProductService } from '../../services/product.service';

interface QueryParams {
    category: string;
}

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.css',
})


export class ProductsComponent {

    categoriesList: any[][] = [
        ["Halak", "fish",],
        ["Marha", "cow"],
        ["Csirke", "chicken"],
        ["Kolbász", "sausage"],
        ["Bárány", "sheep"],
        ["Sertés", "pig"],
        ["Akciók", "discount"]
    ]

    httpClient = inject(HttpClient);
    productList!: any[];
    filteredProductList!: any[]
    currentCategory!: string;
    currentPage: number = 1

    constructor(private router: Router, private route: ActivatedRoute, private product: ProductService) { }

    fetchData() {
        this.product.getAllProducts().subscribe((data: any) => {
            this.productList = data; 
            this.filteredProductList = this.productList;       
        })    
    }



    ngOnInit(): void {
        this.fetchData();

        this.route.queryParams.subscribe(params => {
            this.currentCategory = params["category"] || "all";
            this.currentPage = params["page"] || 1;
            console.log(this.currentPage)
            this.filteredProductList = this.productList;
            if (this.currentCategory != "all") {
                if (this.currentCategory === "discount") {
                    this.filteredProductList = this.productList.filter(products => {
                        return products.discount > 0;
                    })
                } else {            
                    this.filteredProductList = this.productList.filter(products => {
                        return products.category === this.currentCategory;
                    })
                }
            } else {
                this.filteredProductList = this.productList;
            }          
        });
    }



    changeCategory(categoryName: any) {
        if (categoryName) {
            this.router.navigate(['/products'], { queryParams: { category: categoryName, page: '1' } });
        }
    }
}
