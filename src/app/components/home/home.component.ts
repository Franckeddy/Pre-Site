import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductsService } from "src/app/services/products.service";
import { Response } from "src/app/models/response";
@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

    products: any;
    productSub: Subscription = new Subscription;

    constructor(private ProductsServices: ProductsService) {}

    ngOnInit(): void {
        this.productSub = this.ProductsServices.getProducts().subscribe (
            (response: Response) => {
                this.products = response.result;
            },
            (error) => {
            }
        )
    }
}
