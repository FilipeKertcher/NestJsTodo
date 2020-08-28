import { makeTodoModel } from "../Helpers";
import { DomainError } from "src/Domain/Errors/DomainErrors";
import DBClientSpy from "../Repository/spy";
import RemoteUpdateTodo from "../../Data/UseCases/RemoteUpdateTodo";
import { DomainMessages } from "src/Domain/Errors/DomainMessages";

describe('UpdateTodo', () => {
  
    it('update: it should update todo with correct data', async () => {
        const {sut} = makeSut({})
        const updateTodoModel = makeTodoModel({})

        const {error,result} = await sut.update("1",updateTodoModel)

        expect(error).toBe(null)
        expect(result.message).toBe(DomainMessages.updated_with_success)
        
    });

    it('update: it should not complete with incorrect data', async () => {
        const {sut} = makeSut({})
        const updateTodoModel = makeTodoModel({todoText:""})

        const {error} = await sut.update("1",updateTodoModel)

        expect(error).toBe(DomainError.invalid_todo) 
    });

    it('update: it should parse an unexpected error', async () => {
        const {sut} = makeSut({injectError:DomainError.unexpected})

        const updateTodoModel = makeTodoModel({})

        const {error} = await sut.update("1",updateTodoModel)

        expect(error).toBe(DomainError.unexpected) 
    });

});



function makeSut({injectError}:{injectError?:DomainError}) {
    const repo = new DBClientSpy({destination:"REDIS",error:injectError})
    const sut = new RemoteUpdateTodo(repo)

    return {
        sut,
        repo
    }
}


