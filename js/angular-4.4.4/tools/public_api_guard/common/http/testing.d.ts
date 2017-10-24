/** @experimental */
export declare class HttpClientTestingModule {
}

/** @experimental */
export declare abstract class HttpTestingController {
    abstract expectNone(url: string, description?: string): void;
    abstract expectNone(params: RequestMatch, description?: string): void;
    abstract expectNone(matchFn: ((req: HttpRequest<any>) => boolean), description?: string): void;
    abstract expectNone(match: string | RequestMatch | ((req: HttpRequest<any>) => boolean), description?: string): void;
    abstract expectOne(url: string, description?: string): TestRequest;
    abstract expectOne(params: RequestMatch, description?: string): TestRequest;
    abstract expectOne(matchFn: ((req: HttpRequest<any>) => boolean), description?: string): TestRequest;
    abstract expectOne(match: string | RequestMatch | ((req: HttpRequest<any>) => boolean), description?: string): TestRequest;
    abstract match(match: string | RequestMatch | ((req: HttpRequest<any>) => boolean)): TestRequest[];
    abstract verify(opts?: {
        ignoreCancelled?: boolean;
    }): void;
}

/** @experimental */
export interface RequestMatch {
    method?: string;
    url?: string;
}

/** @experimental */
export declare class TestRequest {
    readonly cancelled: boolean;
    request: HttpRequest<any>;
    constructor(request: HttpRequest<any>, observer: Observer<HttpEvent<any>>);
    error(error: ErrorEvent, opts?: {
        headers?: HttpHeaders | {
            [name: string]: string | string[];
        };
        status?: number;
        statusText?: string;
    }): void;
    event(event: HttpEvent<any>): void;
    flush(body: ArrayBuffer | Blob | string | number | Object | (string | number | Object | null)[] | null, opts?: {
        headers?: HttpHeaders | {
            [name: string]: string | string[];
        };
        status?: number;
        statusText?: string;
    }): void;
}
