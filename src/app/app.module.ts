import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { DeleteProductModalComponent } from "./components/delete-product-modal/delete-product-modal.component";
import { AddOrEditProductModalComponent } from "./components/add-or-edit-product-modal/add-or-edit-product-modal.component";
import { ClarityModule } from "@clr/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ShowProductComponent } from "./components/show-product/show-product.component";
import { ReactiveFormsModule } from "@angular/forms";

import { cloudIcon, ClarityIcons } from "@cds/core/icon";
import "@cds/core/icon/register.js";
import "@cds/core/accordion/register.js";
import "@cds/core/alert/register.js";
import "@cds/core/button/register.js";
import "@cds/core/checkbox/register.js";
import "@cds/core/datalist/register.js";
import "@cds/core/file/register.js";
import "@cds/core/forms/register.js";
import "@cds/core/input/register.js";
import "@cds/core/password/register.js";
import "@cds/core/radio/register.js";
import "@cds/core/range/register.js";
import "@cds/core/search/register.js";
import "@cds/core/select/register.js";
import "@cds/core/textarea/register.js";
import "@cds/core/time/register.js";
import "@cds/core/toggle/register.js";
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DeleteProductModalComponent,
        AddOrEditProductModalComponent,
        ShowProductComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ClarityModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule {
    constructor() {
        ClarityIcons.addIcons(cloudIcon);
    }
}
