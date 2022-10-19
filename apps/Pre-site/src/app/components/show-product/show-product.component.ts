import { HttpEvent } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ProductService } from 'src/app/services/products.service';
import { environment } from "src/environments/environment";
import { HttpEventType } from '@angular/common/http';
import { Response } from "src/app/models/response";

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
    delete = false;
    productToBeDelete: Product;
    file: File;
    progress = 0;
    baseUrlImage = `${environment.api_image}`;

    constructor(private productService: ProductService,
                private fileService: FileUploadService) { }

    ngOnInit(): void { }

    onEdit(product: Product): void {
        this.productModalOpen = true;
        this.selectedProduct = product;
    }

    onDelete(product: Product): void {
        this.delete = true;
        this.productToBeDelete = product;
    }

    addProduct(): void {
        this.selectedProduct = undefined;
        this.productModalOpen = true;
    }

    handleFinish(event: { product: any; file: File; }) {
        if (event.product || event.file) {
            let product = event.product ? event.product : null;
            this.file = event.file ? event.file : null;
            // TODO delete console.log
            console.log(product);
            console.log(event);
            console.log(this.file); // <-------------------
            if(this.selectedProduct) {
                // Edit product
                product.idProduct = this.selectedProduct.idProduct;
                this.editProductToServer(product);
            } else {
                // Add product
                this.addProductToServer(product);
            }
        }
        this.productModalOpen = false;
    }

    uploadImage(event: HttpEvent<any>) {
        return new Promise(
            (resolve) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        // TODO delete console.log
                        console.log("Requete Success");
                        break;
                    case HttpEventType.UploadProgress:
                        this.progress = Math.round(event.loaded / event.total * 100);
                        if (this.progress === 100) {
                            resolve(true);
                        }
                        break;
                    case HttpEventType.Response:
                        // TODO delete console.log
                        console.log(event.body);
                        setTimeout(() => {
                            this.progress = 0;
                        }, 1500);
                        break;
                }
            }
        );
    }

    addProductToServer(product) {
        this.productService.addProduct(product).subscribe(
            (data: Response) => {
                if (data.status === 200) {
                    if (this.file) {
                        this.fileService.uploadImage(this.file).subscribe(
                            (event: HttpEvent<any>) => {
                                this.uploadImage(event).then(
                                    () => {
                                        product.idProduct = data.args.lastInsertId;
                                        product.Category = product.category;
                                        this.products.push(product);
                                    }
                                );
                            }
                        );
                    }
                }
            }
        );
    }

    editProductToServer(product: Product) {
        this.productService.editProduct(product).subscribe(
            (data: Response) => {
                if (data.status === 200) {
                    if (this.file) {
                        this.fileService.uploadImage(this.file).subscribe(
                            (event: HttpEvent<any>) => {
                                this.uploadImage(event).then(
                                    () => {
                                        this.updateProducts(product);
                                    }
                                );
                            }
                        );
                        this.fileService.deleteImage(product.oldImage).subscribe(
                            (data: Response) => {
                                // TODO delete console.log
                                console.log(data);
                            }
                        );
                    } else {
                        this.updateProducts(product);
                    }
                } else {
                    // TODO delete console.log
                    console.log(data.message);
                    console.log(product);
                    console.log(data);
                }
            }
        );
    }

    updateProducts(product) {
        // update frontend
        const index = this.products.findIndex((p) => p.idProduct === product.idProduct);
        product.Category = product.category;
        this.products = [
            ...this.products.slice(0,index),
            product,
            ...this.products.slice(index+1)
        ];
    }

    handleCancelDelete() {
        this.delete = false;
    }

    handleConfirmDelete(){
        this.productService.deleteProduct(this.productToBeDelete).subscribe(
            (data: Response) => {
                if(data.status === 200){
                    // Delete Product Image
                    this.fileService.deleteImage(this.productToBeDelete.image).subscribe(
                        (data: Response) => {
                        }
                    );
                    // Update Frontend
                    const index = this.products.findIndex(p => p.idProduct === this.productToBeDelete.idProduct);
                    this.products.splice(index,1);
                }else{
                }
            }
        );
        this.handleCancelDelete();
    }

}
