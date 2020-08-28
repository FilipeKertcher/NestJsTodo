export interface HttpRequest {
    body?: {
        [key:string]:string
    }
    headers?: {
        [key:string]:string
    }
    query?: {
        [key:string]:string
    }
    params?: {
        [key:string]:string
    }
}

export interface HttpResponse {
    statusCode:number;
    data:{
        [key:string]:any
    }
}
