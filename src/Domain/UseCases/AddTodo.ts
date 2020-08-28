import TodoModel from "../Models/TodoModel";
import Todo from "../Models/Todo";
import BaseReturn from "../Models/BaseReturn";
import { RepositoryClientInsertSuccess } from "src/Data/Repository";

export default interface AddTodo {
     add(todoModel:TodoModel): Promise<BaseReturn>
}