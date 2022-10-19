import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from "./../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class RestApiService {

    // Define API
    apiURL = `${environment.api}`;

    constructor(private http: HttpClient) { }

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        })
    }

  // HttpClient API get() method => Fetch products list
    getProducts(): Observable<Product> {
        return this.http.get<Product>(this.apiURL + 'products' + "?API_KEY="+environment.api_key)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

  // HttpClient API get() method => Fetch product
    getProduct(id: any): Observable<Product> {
        return this.http.get<Product>(this.apiURL + 'products/' + id +"?API_KEY="+environment.api_key)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    // HttpClient API post() method => Create product
    createProduct(product: any): Observable<Product> {
        return this.http.post<Product>(this.apiURL + 'products', JSON.stringify(product), this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    // HttpClient API put() method => Update product
    updateProduct(id: string, product: any): Observable<Product> {
        return this.http.put<Product>(this.apiURL + 'products/' + id +"?API_KEY="+environment.api_key, JSON.stringify(product), this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    // HttpClient API delete() method => Delete product
    deleteProduct(idProduct: string){
        // private baseUrl = `${environment.api+"products"+"?API_KEY="+environment.api_key}`;
        // this.baseUrl+"&id="+product.idProduct;
        return this.http.delete<Product>(this.apiURL + 'products/' + "?API_KEY=" + environment.api_key +"&id=" + idProduct, this.httpOptions)
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
