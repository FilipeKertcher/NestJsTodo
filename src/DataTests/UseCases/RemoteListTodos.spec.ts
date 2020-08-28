
import { DomainError } from "src/Domain/Errors/DomainErrors";
import DBClientSpy from "../Repository/spy";
import { makeTodo } from "../Helpers";
import RemoteListTodos from "../../Data/UseCases/RemoteListTodos";

describe('ListTodo', () => {
  
    it('list: it should return a list of todos', async () => {
        const {sut} = makeSut({})
        const {error,result} = await sut.list("FILIPE_KERTCHER")

        expect(error).toBe(null)
        expect(result.data).toStrictEqual([
            makeTodo()
        ])
        
    });

    it('list: it should parse an unexpected error', async () => {
        const {sut} = makeSut({injectError:DomainError.unexpected})
        const {error} = await sut.list("FILIPE_KERTCHER")

        expect(error).toBe(DomainError.unexpected) 
    });
});



function makeSut({injectError}:{injectError?:DomainError}) {
    const repo = new DBClientSpy({destination:"REDIS",error:injectError})
    const sut = new RemoteListTodos(repo)

    return {
        sut,
        repo
    }
}


