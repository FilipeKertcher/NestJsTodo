import AddTodo from "src/Domain/UseCases/AddTodo";

export default class AddTodoSpy implements AddTodo {
    error: any;
    addTodoParams: any;
    constructor(error) {
        this.error = error;
    }
    
    validateTodo(model) {
        if (!model.todoText)
            throw 1;
    }

    async add(todoModel) {
        try {
            if (this.error != null)
                return {
                    error: this.error,
                    result: null
                };
            this.validateTodo(todoModel);
            this.addTodoParams = todoModel;
            return {
                error: null,
                result: {
                    code: 200,
                    message: 0,
                    created: "123"
                }
            };
        }
        catch (err) {
            return {
                error: err,
                result: null
            };
        }
    }
}