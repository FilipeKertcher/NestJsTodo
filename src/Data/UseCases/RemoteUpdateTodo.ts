import { RepositoryClient } from "../Repository"
import UpdateTodo from "src/Domain/UseCases/UpdateTodo"
import TodoModel from "src/Domain/Models/TodoModel"
import { DomainError } from "src/Domain/Errors/DomainErrors"

export default class RemoteUpdateTodo implements UpdateTodo {

    repo: RepositoryClient<TodoModel>

    constructor(repo:RepositoryClient<TodoModel>){
        this.repo = repo
    }


    validateTodo(model:TodoModel){
        if(!model.todoText) throw DomainError.invalid_todo
    }

    async update(id: string, updateTodoModel: TodoModel): Promise<any> {
        try {
            this.validateTodo(updateTodoModel)

            const result = await this.repo.updateData(id,updateTodoModel)
        
            return {error:null,result}
        }catch(error){
            
           return {error,result:null}
        }     
    }
    
}