import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "src/app/app.module";

import { AddOrEditProductModalComponent } from "./add-or-edit-product-modal.component";

describe("AddOrEditProductModalComponent", () => {
    let component: AddOrEditProductModalComponent;
    let fixture: ComponentFixture<AddOrEditProductModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                        ReactiveFormsModule,
                        HttpClientModule,
                        TranslateModule.forRoot({
                            loader: {
                                provide: TranslateLoader,
                                useFactory: HttpLoaderFactory,
                                deps: [HttpClient]
                            }
                        }),
                    ],
            declarations: [ AddOrEditProductModalComponent ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddOrEditProductModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
