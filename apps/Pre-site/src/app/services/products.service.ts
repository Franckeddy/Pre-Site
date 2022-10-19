import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Response } from "../models/response";
import { Product } from "../models/product";
import { retry, catchError } from 'rxjs/operators';
@Injectable({
    providedIn: "root"
})

export class ProductService {

    private baseUrl = `${environment.api+'products?'+'API_KEY='+environment.api_key}`;
    private baseUrlUpdate = `${environment.api+'updateProducts?'+'API_KEY='+environment.api_key}`;

    constructor(private http: HttpClient) { }

    // Define API
    apiURL = `${environment.api}`;

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        }), responseType: 'text' as 'json'
    };


    getProducts() : Observable<Response> {
        return this.http.get<Response>(this.baseUrl)
        // return this.http.get<Response>(this.baseUrl, this.httpOptions)
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
        const url = this.baseUrlUpdate+"&id="+product.idProduct;
        return this.http.get<Response>(url);
    }

    deleteProduct(product: Product): Observable<Response> {
        const url = this.baseUrl+"&id="+product.idProduct;
        return this.http.delete<Response>(url);
    }

    constructURLParams = (object) => {
        let result = '';
        for (const property in object) {
            result += `&${property}=${object[property]}`;
        }
        return result;
    }

    // HttpClient API put() method => Update product
    updateProduct(id: string, product: any): Observable<Product> {
        return this.http.put<Product>(this.baseUrl + '/products/' + id, JSON.stringify(product), this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    // Error handling
    handleError(error: { error: { message: string; }; status: any; message: any; }) {
        let errorMessage = '';
        if(error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
