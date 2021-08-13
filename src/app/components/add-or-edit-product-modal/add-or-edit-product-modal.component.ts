import { ProductService } from './../../services/products.service';
import { CategoriesService } from './../../services/categories.service';
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-add-or-edit-product-modal',
    templateUrl: './add-or-edit-product-modal.component.html',
    styleUrls: ['./add-or-edit-product-modal.component.scss']
})
export class AddOrEditProductModalComponent implements OnInit, OnDestroy, OnChanges {

    @Input() product: Product;
    @Output() finish = new EventEmitter();

    productForm: FormGroup;
    categories: Category[];
    categorySub: Subscription;
    idCategory: 1;
    file!: File;

    constructor(public fb: FormBuilder, private categoriesService:CategoriesService) {
        this.productForm = fb.group({
                productInfos: fb.group({
                    name: ['',Validators.required],
                    description: ['',Validators.required],
                    price: ['',Validators.required],
                    stock: ['',Validators.required],
                }),
                illustration: fb.group({
                    image: ['',Validators.required],
                }),
        });
    }

    selectCategory(id: any) {
        this.idCategory = id;
    }

    get isProductInfosInvalid(): boolean {
        return this.productForm.get('productInfos').invalid;
    }

    get isIllustrationInvalid(): boolean {
        if (this.product) {
            return false;
        }
        return this.productForm.get('illustration').invalid;
    }

    handleCancel() {
        this.finish.emit();
        this.close();
    }

    handleFinish() {
        const product = {
            ...this.productForm.get('productInfos').value,
            ...this.productForm.get('illustration').value,
            Category: this.idCategory,
            oldImage: null,
        };
        if (this.product) {
            product.oldImage = this.product.oldImage;
        }
        if (this.file) {
            product.image = this.file.name;
        } else {
            product.image = this.product.oldImage;
        }
        this.finish.emit({product: product, file: this.file ? this.file : null});
        this.close();
    }

    close() {
        this.productForm.reset();
        this.idCategory = 1;
    }

    detecteFiles (event) {
        this.file = event.target.files[0];
    }

    updateForm (product: Product) {
        this.productForm.patchValue({
            productInfos:{
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
            }
        });
        product.oldImage = product.image;
        this.selectCategory(product.Category);
    }

    ngOnInit(): void {
        this.categorySub = this.categoriesService.getCategory().subscribe(
            (response) => {
                this.categories = response.result;
            }
        );
    }

    ngOnDestroy(): void {
        this.categorySub.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.product) {
            this.updateForm(this.product);
        }
    }

}
