import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Response } from "../models/response";
import { Product } from "../models/product";
@Injectable({
    providedIn: "root"
})

export class ProductsService {

    baseUrl = `${environment.api+"products"+"?API_KEY="+environment.api_key}`;
    baseUrlUpate = `${environment.api+"updateProducts"+"?API_KEY="+environment.api_key}`;

    constructor(private http: HttpClient) { }

    getProducts() : Observable<Response> {
        return this.http.get<Response>(this.baseUrl);
    }

    addProduct(product: Product) : Observable<Response> {
        let params = new FormData();
        params.append("name", product.name);
        params.append("description", product.description);
        params.append("price", `${product.price}`);
        params.append("stock", `${product.stock}`);
        params.append("category", `${product.Category}`);
        params.append("image", product.image);

        return this.http.post<Response>(this.baseUrl, params);
    }

    editProduct(product: Product) : Observable<Response> {
        const url = this.baseUrlUpate+this.constructUrlParams(product);
        return this.http.get<Response>(url);
    }

    constructUrlParams = (object) => {
        let result = '';
        for (const property in object) {
            result += `&${property}=${object[property]}`;
        }
        return result;
    };
}
