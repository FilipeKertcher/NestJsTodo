export interface CreateFileModel{
    html?:string
    templateId?:string
    additionalData:{
        [key:string]:any
    }
}