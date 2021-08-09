import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
    selector: 'app-show-product',
    templateUrl: './show-product.component.html',
    styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {

    @Input()
    products: Product[] = [];
    productModalOpen = false;
    selectedProduct!: Product;

    constructor() { }

    ngOnInit(): void {
    }

    onEdit(product: Product): void {
        this.productModalOpen = true;
        this.selectedProduct = product;
    }

    onDelete(product: Product): void {

    }

    addProduct(): void {
        this.productModalOpen = true;
    }

    handleFinish(product: any) {
        if(product) {
            console.log(product);
            if(this.selectedProduct) {
                // Edit Product
            } else {
                // Add Product
            }
        }
        this.productModalOpen = false;
    }

}
