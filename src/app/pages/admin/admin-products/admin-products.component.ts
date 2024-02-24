import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent implements OnInit {
    // DIALOG
    showDeleteDialog: boolean = false;
    showAddDialog: boolean = false;
    showEditDialog: boolean = false;

    @Input() currentPage: any = 1;
    @Input() pagesList: any;
    uploadedImage: any = null;
    currentActionIndex: number = 0;
    currentCategory: string = "all";

    productList: any[] = [];
    categoryList: any = {
        "chicken": "Csirke",
        "pig": "Sertés",
        "fish": "Hal"
    }

    productInputs: any = {
        "productName": "",
        "productPrice": "",
        "productDiscount": "",
        "productDescription": "",
        "productImage": "",
        "productCategory": "",
    }

    totalPages = 0;
    totalItems = 0;
    itemsPerPage: number = 7;

    constructor(private httpClient: HttpClient, private router: Router,  private route: ActivatedRoute, private productService: ProductService, private toast: NgToastService) { }

    ngOnInit(): void {
        this.fetchData();

        this.route.queryParams.subscribe(params => {
            this.currentPage = Number(params["page"]) || 1;
        });
    }

    addNewProduct() {
        const formData = new FormData();
        formData.append("Name", this.productInputs.productName);   
        formData.append("Price", this.productInputs.productPrice);   
        formData.append("Discount", this.productInputs.productDiscount);  
        formData.append("Description", this.productInputs.productDescription);  
        formData.append("ImageFile", this.productInputs.productImage);
        formData.append("Category", this.productInputs.productCategory);   

    
        this.productService.addNewProduct(formData).subscribe((data) => {
            if (data.success === true) {
                this.toast.success({detail: "Siker", summary: "Sikeresen hozzáadtál a listához egy terméket!"});
                this.showAddDialog = false;
                this.fetchData();
            }
        })     
    }

    changeCurrentCategory() {
        this.totalItems = Math.ceil(this.filteredList.length / this.itemsPerPage)
        this.pagesList = Array.from({ length: this.totalItems }, (_, i) => i + 1)

        this.router.navigate(["admin/products/?", {page: 1}])
        this.currentPage = 1
    }

    editProduct() {
        if (this.currentActionIndex > 0) {

            const formData = new FormData();
            formData.append("Name", this.productInputs.productName);   
            formData.append("Price", this.productInputs.productPrice);   
            formData.append("Discount", this.productInputs.productDiscount);  
            formData.append("Description", this.productInputs.productDescription);  
            formData.append("ImageFile", this.productInputs.productImage);
            formData.append("Category", this.productInputs.productCategory);   

            console.log(this.productInputs.productCategory)

            this.productService.updateProduct(this.currentActionIndex, formData).subscribe((data) => {
                if (data.success === true) {
                    this.toast.success({detail: "Siker", summary: data?.data?.message})
                    this.fetchData();
                    this.showEditDialog = false;
                }
            })
        }
    }

    deleteProduct() {
        if (this.currentActionIndex > 0) {
            this.productService.deleteProduct(this.currentActionIndex).subscribe((data) => {
                if (data.success === true) {
                    this.toast.success({detail: "Siker", summary: data?.data?.message})
                    this.fetchData();
                    this.showDeleteDialog = false;
                }
            })
        }
    }

    showEditProduct(indexValue: any) {
        this.currentActionIndex = indexValue
        var currentProduct = this.productList.filter((productValue) => {
            return productValue["id"] === indexValue;
        })
        
        this.showEditDialog = true
        if (currentProduct) {
            this.productInputs.productName = currentProduct[0]["name"]
            this.productInputs.productPrice = currentProduct[0]["price"]
            this.productInputs.productDescription = currentProduct[0]["description"]
            this.productInputs.productDiscount = currentProduct[0]["discount"]            
            this.uploadedImage = currentProduct[0]["imagePath"]     
            this.productInputs.productCategory = currentProduct[0]["category"]  
        }
    }

    setActionIndex(indexValue: any) {
        this.currentActionIndex = indexValue
    }


    inputDelete() {
        if (this.uploadedImage) {
            URL.revokeObjectURL(this.uploadedImage);
            this.uploadedImage = null
        }
        this.productInputs = {
            "productName": "",
            "productPrice": "",
            "productDiscount": "",
            "productDescription": "",
            "productImage": "",
            "productCategory": "",
        }
        
    }

    onFileUplaoded(event: any) {
        const selectedFile: File = event.target.files[0];
        if (selectedFile) {
            this.productInputs.productImage = selectedFile
            this.uploadedImage = URL.createObjectURL(selectedFile)
        }
    }

    get filteredList() {
        if (this.currentCategory === "all") {
            return this.productList
        }
        return this.productList.filter((productValue) => {
            return productValue["category"] === this.currentCategory
        })
    }

    get paginatedList() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage
        const endIndex = (this.currentPage) * this.itemsPerPage

        return this.filteredList.slice(startIndex, endIndex)
    }

    getDiscountedCount() {
        return this.productList.filter((productValue) => {
            return productValue["discount"] > 0
        }).length
    }

    getCurrentMaxPage(currentPage: number) {
        return Math.min(currentPage * this.itemsPerPage, this.filteredList.length)
    }

    getPrevPage(currentPage: number) {
        return Math.max(currentPage - 1, 1)
    }

    getNextPage(currentPage: number) {
        return Math.min(currentPage + 1, this.filteredList.length)
    }

    getCategory(categoryValue: any) {
        if (this.categoryList[categoryValue]) {
            return this.categoryList[categoryValue]
        }
         else {
            return categoryValue;
        }
    }

    fetchData() {
        this.httpClient.get("https://localhost:7228/api/Product/").subscribe((data: any) => {
            this.productList = data;
            this.totalItems = Math.ceil(this.filteredList.length / this.itemsPerPage)
            this.pagesList = Array.from({ length: this.totalItems }, (_, i) => i + 1)
        })     
    }
}
