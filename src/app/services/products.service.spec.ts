import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from "./products.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("ProductService", () => {
    let service: ProductService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientModule ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
        });
        service = TestBed.inject(ProductService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
