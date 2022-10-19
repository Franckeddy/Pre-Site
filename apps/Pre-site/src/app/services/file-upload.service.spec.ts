import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from '@angular/common/http';
import { FileUploadService } from "./file-upload.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("FileUploadService", () => {
    let service: FileUploadService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientModule ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        });
        service = TestBed.inject(FileUploadService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
