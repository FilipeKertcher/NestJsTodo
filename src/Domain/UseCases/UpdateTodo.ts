import TodoModel from "../Models/TodoModel";

export default interface UpdateTodo {
    update(id:string,updateTodoModel:TodoModel):Promise<any>
}