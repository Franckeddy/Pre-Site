import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Response } from "../models/response";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: "root"
})
export class CategoriesService {

    private baseUrl = `${environment.api+"category"+"?API_KEY="+environment.api_key}`;;

    constructor(private http: HttpClient) { }

    getCategory() : Observable<Response> {
        return this.http.get<Response>(this.baseUrl);
    }
}
