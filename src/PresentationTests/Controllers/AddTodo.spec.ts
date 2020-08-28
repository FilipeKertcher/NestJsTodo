import AddTodoController from "../../Presentation/Controllers/AddTodo"
import AddTodoSpy from "../Spies/AddTodo"
import { DomainError } from "../../Domain/Errors/DomainErrors"
import { makeHttpRequest } from "../Helpers"
import { makeTodoModel } from "../../DataTests/Helpers"

function makeSut({injectError}:{injectError?:DomainError}){
    const addTodo = new AddTodoSpy(injectError)
    const sut = new AddTodoController(addTodo)

    return {
        addTodo,
        sut
    }
}

describe("AddTodo Controller",() => {
    
    it("should call Add with correct values",async () => {
        const {sut,addTodo} = makeSut({})
        const model = makeTodoModel({})
        const request = makeHttpRequest({body:model})

        await sut.handle(request)

        expect(addTodo.addTodoParams).toStrictEqual(model)

    })

    it("should not add with invalid data",async () => {
        const {sut,addTodo} = makeSut({injectError:DomainError.invalid_todo})
        const model = makeTodoModel({})
        const request = makeHttpRequest({body:model})

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(406)
        expect(response.data["error"]).toBe(DomainError.invalid_todo)
        
    })

    it("should add with valid data",async () => {
        const {sut} = makeSut({})
        const model = makeTodoModel({})
        const request = makeHttpRequest({body:model})

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(200)
        expect(response.data['created']).not.toBe(null)
        
    })

    it("should parse an unexpected error",async () => {
        const {sut} = makeSut({injectError:DomainError.unexpected})
        const model = makeTodoModel({})
        const request = makeHttpRequest({body:model})

        const response = await sut.handle(request)

        expect(response.statusCode).toBe(406)
        expect(response.data["error"]).toBe(DomainError.unexpected)
        
    })

})