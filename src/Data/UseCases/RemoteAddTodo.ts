import AddTodo from "src/Domain/UseCases/AddTodo"
import { RepositoryClient } from "../Repository"
import { DomainError } from "src/Domain/Errors/DomainErrors"
import TodoModel from "src/Domain/Models/TodoModel"

export default class RemoteAddTodo implements AddTodo {
    
    repo: RepositoryClient<TodoModel>

    constructor(repo:RepositoryClient<TodoModel>){
        this.repo = repo
    }

    validateTodo(model:TodoModel){
        if(!model.todoText) throw DomainError.invalid_todo
    }

    async add(todoModel:TodoModel){
        try {
            this.validateTodo(todoModel)

            const result = await this.repo.insertData(todoModel)
        
            return {error:null,result}
        }catch(error){
           return {error,result:null}
        }     
    }
}
