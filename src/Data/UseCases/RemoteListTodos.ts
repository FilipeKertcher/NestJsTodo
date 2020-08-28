import ListTodos from "src/Domain/UseCases/ListTodos"
import { RepositoryClient } from "../Repository"
import Todo from "src/Domain/Models/Todo"

export default class RemoteListTodos implements ListTodos {

    repo: RepositoryClient<Todo>

    constructor(repo:RepositoryClient<Todo>){
        this.repo = repo
    }
    
    async list(userId:string) {
        try {  
            const result = await this.repo.listData(userId)
        
            return {error:null,result}
        }catch(error){
            
           return {error,result:null}
        }     
    }
    
}