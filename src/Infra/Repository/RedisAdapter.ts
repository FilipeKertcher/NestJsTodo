import { RepositoryClient } from "src/Data/Repository";
import { v4 as uuidv4 } from 'uuid';
import { DomainMessages } from "src/Domain/Errors/DomainMessages";
import { DomainError } from "src/Domain/Errors/DomainErrors";

interface RepositoryClientConstructor {
    destination:string
    client:any
    error?:string
}

export default class RedisAdapter<T> implements RepositoryClient<T> {
    destination: string;
    client:any
    constructor({destination,client}:RepositoryClientConstructor){
        this.destination = destination
        this.client = client
    }

    validateJestProps(){
        if(!!process.env.JEST_WORKER_ID && this.client.throwError === true) throw DomainError.unexpected
    }

    async listData(userId:string) {
        try {
            this.validateJestProps()

            const data = await this.client.lrange(userId, 0, -1)
        
            return {
                message:null,
                code:200,
                data
            }
        }catch(error){
            throw error
        }
         
    }

    async insertData(data: T) {
        try {
            this.validateJestProps()

            const uniqueHash = uuidv4();
            data["_id"] = uniqueHash
            this.client.rpush(data["userId"], JSON.stringify(data));
            return {
                message:DomainMessages.inserted_with_success,
                code:200,
                created:data
            }
        }catch(error){
            throw error
        }   
    }

    async updateData(id: string, data: T) {
        try {
            this.validateJestProps()
            this.client.set(id, data)
            
            return {
                message:DomainMessages.updated_with_success,
                code:200,
                updated:true
            }
        }catch(error){
            throw error
        } 
    }

    async removeData(id: string) {
         try {
            this.validateJestProps()
            await this.client.rpop('FILIPE_KERTCHER');
            return {
                message:DomainMessages.removed_with_success,
                code:200,
                removed:true
            }
         }catch(err) {
            throw err
         }
        
    }

}