import ControllerProtocol from "../Protocols/Controller"
import AddTodo from "src/Domain/UseCases/AddTodo"

export default class AddTodoController implements ControllerProtocol {

    constructor( 
        private readonly addTodo:AddTodo
    ){}
    
    async handle(request){
        const {error,result} = await this.addTodo.add(request.body)
           
        const statusCode = error != null ? 406 : 200

        return {
            statusCode,
            data:error != null ? {error} : result
        }
    }
}