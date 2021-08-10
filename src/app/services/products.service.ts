import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/response';
import { Product } from '../models/product';

const optionRequete = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
    })
};

@Injectable({
    providedIn: 'root'
})

export class ProductsService {

    httpOptions = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        })
    };

    baseUrl: string = 'http://localhost:8888/e-commerce/backend/api/products?API_KEY=adsffsdfds6b-6727-46f4-8bee-2c6ce6293e41';

    constructor(private http: HttpClient) { }

    getProducts() : Observable<Response> {
        return this.http.get<Response>(this.baseUrl);
    }

    addProduct(product: Product) : Observable<Response> {
        let params = new FormData();
        params.append('name', product.name);
        params.append('description', product.description);
        params.append('price', `${product.price}`);
        params.append('stock', `${product.stock}`);
        params.append('category', product.category);
        params.append('image', product.image);

        return this.http.post<Response>(this.baseUrl, params);
    }
}
