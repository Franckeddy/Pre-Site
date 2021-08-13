import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from "./categories.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("CategoriesService", () => {
    let service: CategoriesService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        });
        service = TestBed.inject(CategoriesService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
