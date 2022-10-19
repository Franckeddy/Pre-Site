import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})

export class FileUploadService {

    private baseUrl = `${environment.api+"image"+"?API_KEY="+environment.api_key}`;

    constructor(private http: HttpClient) { }

    uploadImage(file: File): Observable<any> {
        let formData: any = new FormData();
        formData.append("image", file);

        return this.http.post(this.baseUrl, formData, {
            reportProgress: true,
            observe: "events",
        });
    }

    deleteImage(name: string): Observable<any> {
        const url = this.baseUrl+"&name="+name;
        return this.http.delete(url);
    }
}
