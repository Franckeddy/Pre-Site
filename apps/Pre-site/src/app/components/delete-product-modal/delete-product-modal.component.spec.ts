import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "src/app/app.module";

import { DeleteProductModalComponent } from "./delete-product-modal.component";

describe("DeleteProductModalComponent", () => {
    let component: DeleteProductModalComponent;
    let fixture: ComponentFixture<DeleteProductModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports:
            [
                HttpClientModule,
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient]
                    }
                }),
            ],
            declarations: [ DeleteProductModalComponent ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteProductModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
