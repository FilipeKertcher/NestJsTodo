import { HttpRequest, HttpResponse } from "./Http";

export default interface ControllerProtocol {
    handle(request:HttpRequest): Promise<HttpResponse>
}