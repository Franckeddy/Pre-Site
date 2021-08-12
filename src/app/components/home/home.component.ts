import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductsService } from "src/app/services/products.service";
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

    constructor(private ProductsServices: ProductsService, public translate: TranslateService) {
        translate.addLangs(['fr', 'en']);
        translate.setDefaultLang('fr');
    }

    ngOnInit(): void {
        this.productSub = this.ProductsServices.getProducts().subscribe (
            (response: Response) => {
                this.products = response.result;
            },
            (error) => {
            }
        )
    }

    useLanguage(language: string): void {
        this.translate.use(language);
        }

    switchLang(lang: string) {
        this.translate.use(lang);
    }
}
