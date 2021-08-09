import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../models/response';

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
}
