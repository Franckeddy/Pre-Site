import { HttpEvent, HttpEventType } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { Product } from "src/app/models/product";
import { FileUploadService } from "src/app/services/file-upload.service";
import { ProductsService } from "src/app/services/products.service";
import { environment } from "src/environments/environment";
import { Response } from "src/app/models/response";

@Component({
    selector: "app-show-product",
    templateUrl: "./show-product.component.html",
    styleUrls: ["./show-product.component.scss"]
})

export class ShowProductComponent implements OnInit {

    @Input()
    products: Product[] = [];
    productModalOpen = false;
    selectedProduct!: Product;
    file!: File;
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
        this.selectedProduct = undefined;
        this.productModalOpen = true;
    }

    handleFinish(event: any) {
        let product = event.product ? event.product : null;
        this.file = event.file ? event.file : null;
        if(product) {
            if(this.selectedProduct) {
                product.idProduct = this.selectedProduct.idProduct;
                this.editProductToServer(product);
            } else {
                this.addProductToServer(product);
            }
        }
        this.productModalOpen = false;
    }
    uploadImage(event: HttpEvent<any>) {
        switch (event.type) {
            case HttpEventType.Sent:
                break;
            case HttpEventType.UploadProgress:
                    this.progress = Math.round(event.loaded / event.total! * 100);
                break;
            case HttpEventType.Response:
            setTimeout(() => {
                this.progress = 0;
            }, 1500);
        }
    }
    addProductToServer(product: Product) {
        this.productsService.addProduct(product).subscribe(
            (data) => {
                if (data.status === 200) {
                    if (this.file) {
                        this.fileService.uploadImage(this.file).subscribe(
                            (event: HttpEvent<any>) => {
                                this.uploadImage(event);
                            }
                        );
                    }
                    product.idProduct = data.args.lastInsertId;
                    this.products.push(product);
                }
            }
        );
    }
    editProductToServer(product: Product) {
        this.productsService.editProduct(product).subscribe (
            (data) => {
                if (data.status === 200) {
                    if (this.file) {
                        this.fileService.uploadImage(this.file).subscribe(
                            (event: HttpEvent<any>) => {
                                this.uploadImage(event);
                            }
                        );
                        this.fileService.deleteImage(product.oldImage).subscribe(
                            (data: Response) => {
                            }
                        );
                    }
                    const index = this.products.findIndex(p => p.idProduct == product.idProduct);
                    this.products = [
                        ...this.products.slice(0, index),
                        product,
                        ...this.products.slice(index + 1)
                    ];
                } else {
                }
            }
        );
    };
}
