import RemoveTodo from "src/Domain/UseCases/RemoveTodo"
import { RepositoryClient } from "../Repository"
import Todo from "src/Domain/Models/Todo"

export default class RemoteRemoveTodo implements RemoveTodo{

    repo: RepositoryClient<Todo>

    constructor(repo:RepositoryClient<Todo>){
        this.repo = repo
    }
    
    async remove(id: string): Promise<any> {
        try {
            const result = await this.repo.removeData(id)
        
            return {error:null,result}
        }catch(error){
           return {error,result:null}
        }   
    }

}