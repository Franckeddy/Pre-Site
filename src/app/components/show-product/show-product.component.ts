import { HttpEvent } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from "src/environments/environment";
import { HttpEventType } from '@angular/common/http';

@Component({
    selector: 'app-show-product',
    templateUrl: './show-product.component.html',
    styleUrls: ['./show-product.component.scss']
})
export class ShowProductComponent implements OnInit {

    @Input()
    products: Product[];
    productModalOpen = false;
    selectedProduct: Product;
    file: File;
    progress = 0;
    baseUrlImage = `${environment.api_image}`;

    constructor(private productsService: ProductsService,private fileService: FileUploadService) { }

    ngOnInit(): void { }

    onEdit(product: Product): void {
        this.productModalOpen = true;
        this.selectedProduct = product;
    }

    onDelete(product: Product): void { }

    addProduct(): void {
        this.productModalOpen = true;
    }

    handleFinish(event) {
        let product = event.product ? event.product : null;
        this.file = event.file ? event.file : null;
        if(product) {
            if(this.selectedProduct) {
            } else {
                this.productsService.addProduct(product).subscribe(
                    (data) => {
                        if (data.status === 200) {
                            if (this.file) {
                                this.fileService.uploadImage(this.file).subscribe(
                                    (event: HttpEvent<any>) => {
                                        switch (event.type) {
                                            case HttpEventType.Sent:
                                                break;
                                            case HttpEventType.UploadProgress:
                                                this.progress = Math.round(event.loaded / event.total * 100);
                                                break;
                                            case HttpEventType.Response:
                                                setTimeout(() => {
                                                    this.progress = 0;
                                                }, 1000);
                                                break;
                                        }
                                    }
                                );
                            }
                            product.idProduct = data.args.lastInsertId;
                            this.products.push(product);
                        }
                    }
                );
            }
        }
        this.productModalOpen = false;
    }

}
