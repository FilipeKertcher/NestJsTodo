import { RepositoryClient, RepositoryClientInsertSuccess, RepositoryClientUpdateSuccess, RepositoryClientRemoveSuccess, RepositoryClientListSuccess } from "../../Data/Repository";
import { makeTodo } from "../Helpers";
import { DomainError } from "src/Domain/Errors/DomainErrors";
import { DomainMessages } from "src/Domain/Errors/DomainMessages";

interface DBClientSpyConstructor {
    destination:string
    error:DomainError
}


export default class DBClientSpy<T> implements RepositoryClient<T>{
    destination:string;
    error: DomainError

    constructor({destination,error}:DBClientSpyConstructor){
        this.destination = destination
        this.error = error
    }

    listData(userId:string): Promise<RepositoryClientListSuccess> {
        return new Promise((resolve) => {
            if(this.error != null) throw this.error
            resolve({
                message:null,
                code:200,
                data:[
                    makeTodo()
                ] 
            })
        })
    }
    
    removeData(id: string): Promise<RepositoryClientRemoveSuccess> {
        return new Promise((resolve) => {
            if(this.error != null) throw this.error
            setTimeout(() => {
             
             resolve({
                 message:DomainMessages.removed_with_success,
                 code:200,
                 removed:true 
             })
            },100)
        })
    }

    updateData(id: string, data: T): Promise<RepositoryClientUpdateSuccess> {
       return new Promise((resolve) => {
           if(this.error != null) throw this.error
           setTimeout(() => {
            resolve({
                message:DomainMessages.updated_with_success,
                code:200,
                updated:true
            })
           },100)
       })
    }

    insertData(data: T): Promise<RepositoryClientInsertSuccess> {
       return new Promise((resolve) => {
            if(this.error != null) throw this.error
           setTimeout(() => {
            const created = makeTodo()
            resolve({
                message:DomainMessages.inserted_with_success,
                code:200,
                created
            })
           },100)
       })
    }
}