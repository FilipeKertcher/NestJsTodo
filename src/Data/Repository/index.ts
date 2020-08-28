import { DomainMessages } from "src/Domain/Errors/DomainMessages";

export interface RepositoryClientResponse {
    message?:DomainMessages ;
    code:number;
}


export interface RepositoryClientInsertSuccess extends RepositoryClientResponse {
    created:any
}

export interface RepositoryClientUpdateSuccess extends RepositoryClientResponse {
    updated:boolean
}

export interface RepositoryClientRemoveSuccess extends RepositoryClientResponse {
    removed:boolean
}

export interface RepositoryClientListSuccess extends RepositoryClientResponse {
    data:any[]
}

export interface RepositoryClient<T> {
     destination:string
     validateJestProps?():void
     insertData(data:T): Promise<RepositoryClientInsertSuccess>
     updateData(id:string, data:T): Promise<RepositoryClientUpdateSuccess>
     removeData(id:string): Promise<RepositoryClientRemoveSuccess>
     listData(userId:string): Promise<RepositoryClientListSuccess>
}



 