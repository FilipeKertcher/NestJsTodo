import Todo from "src/Domain/Models/Todo"
import TodoModel from "src/Domain/Models/TodoModel"
 
export function makeTodoModel({todoText = "Foo Bar", todoCompleted = false, todoDate = new Date().toISOString()}) :TodoModel {
    return {
        todoText,
        todoCompleted,
        todoDate,
        userId:"123"
    }
}

export function makeTodo() : Todo {
    return {
        _id:"1234242",
        todoText:"Todo Example",
        todoCompleted:false,
        todoDate: "2020-02-20",
        userId:"123"
    }
}

