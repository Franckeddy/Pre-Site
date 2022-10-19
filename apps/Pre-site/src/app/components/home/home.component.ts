import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductService } from "src/app/services/products.service";
import { Response } from "src/app/models/response";
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

    products;
    productSub;

    constructor(private ProductService: ProductService, public translate: TranslateService) {
        translate.addLangs(['fr', 'en']);
        translate.setDefaultLang('fr');
    }

    ngOnInit(): void {
        this.productSub = this.ProductService.getProducts().subscribe (
            (response: Response) => {
                this.products = response.result;
            },
            (error) => {
                // TODO delete console.log
                console.log(error);
            }
        );
    }

    useLanguage(language: string): void {
        this.translate.use(language);
        }

    switchLang(lang: string) {
        this.translate.use(lang);
    }
}
