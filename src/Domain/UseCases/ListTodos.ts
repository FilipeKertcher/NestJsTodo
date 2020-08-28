import Todo from "../Models/Todo";

export default interface ListTodos {
    list(userId:string):Promise<any>
}