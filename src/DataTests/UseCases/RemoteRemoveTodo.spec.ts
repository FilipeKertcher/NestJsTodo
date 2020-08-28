
import { DomainError } from "src/Domain/Errors/DomainErrors";
import DBClientSpy from "../Repository/spy";
import RemoteRemoveTodo from "../../Data/UseCases/RemoteRemoveTodo";
import { DomainMessages } from "src/Domain/Errors/DomainMessages";

describe('RemoveTodo', () => {
  
    it('remove: it should update todo with correct data', async () => {
        const {sut} = makeSut({})
        const {error,result} = await sut.remove("1")

        expect(error).toBe(null)
        expect(result.message).toBe(DomainMessages.removed_with_success)
        
    });

    it('remove: it should parse an unexpected error', async () => {
        const {sut} = makeSut({injectError:DomainError.unexpected})
        const {error} = await sut.remove("1")

        expect(error).toBe(DomainError.unexpected) 
    });
});



function makeSut({injectError}:{injectError?:DomainError}) {
    const repo = new DBClientSpy({destination:"REDIS",error:injectError})
    const sut = new RemoteRemoveTodo(repo)

    return {
        sut,
        repo
    }
}


