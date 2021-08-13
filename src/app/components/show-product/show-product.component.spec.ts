import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ShowProductComponent } from "./show-product.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "src/app/app.module";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("ShowProductComponent", () => {
    let component: ShowProductComponent;
    let fixture: ComponentFixture<ShowProductComponent>;

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
            declarations: [ ShowProductComponent ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShowProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
