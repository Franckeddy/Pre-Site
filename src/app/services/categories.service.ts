import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Response } from "../models/response";

const optionRequete = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
    })
};

@Injectable({
    providedIn: "root"
})
export class CategoriesService {

    httpOptions = {
        headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        })
    };

    baseUrl: string = "http://localhost:8888/e-commerce/backend/api/category?API_KEY=adsffsdfds6b-6727-46f4-8bee-2c6ce6293e41";

    constructor(private http: HttpClient) { }

    getCategory() : Observable<Response> {
        return this.http.get<Response>(this.baseUrl);
    }
}
