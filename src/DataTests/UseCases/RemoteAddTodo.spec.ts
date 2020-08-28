import { makeTodo, makeTodoModel } from "../Helpers";
import { DomainError } from "src/Domain/Errors/DomainErrors";
import RemoteAddTodo from "../../Data/UseCases/RemoteAddTodo";
import DBClientSpy from "../Repository/spy";
import { DomainMessages } from "src/Domain/Errors/DomainMessages";


describe('RemoteAddTodo', () => {
  
    it('add: it should save todo with correct data', async () => {
        const {sut} = makeSut({})
        const addTodoModel = makeTodoModel({})

        const {error,result} = await sut.add(addTodoModel)

        expect(error).toBe(null)
        expect(result.message).toBe(DomainMessages.inserted_with_success)
    });

   
    it('add: it should not complete with invalid data',async () => {
        const {sut} = makeSut({})
        const addTodoModel = makeTodoModel({todoText:""})

        const {error} = await sut.add(addTodoModel)
        expect(error).toBe(DomainError.invalid_todo)
    });


    it('add: it should parse an unpexpected error', async () => {
        const {sut,repo} = makeSut({injectError:DomainError.unexpected})

        repo.error = DomainError.unexpected
        const addTodoModel = makeTodoModel({})

        const {error} = await sut.add(addTodoModel)

        expect(error).toBe(DomainError.unexpected)
        
    });


    it('add: it should receive the created todo in response', async() => {
         
        const {sut} = makeSut({})
        const addTodoModel = makeTodoModel({})

        const {result} = await sut.add(addTodoModel)
        const tst = result.created
            
        expect(tst).toStrictEqual(makeTodo())
    });
   
    

});



function makeSut({injectError}:{injectError?:DomainError}) {
    const repo = new DBClientSpy({destination:"REDIS",error:injectError})
    const sut = new RemoteAddTodo(repo)

    return {
        sut,
        repo
    }
}

