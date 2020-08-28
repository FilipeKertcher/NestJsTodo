import CreateFile from "src/Domain/UseCases/CreateFile";
import { CreateFileModel } from "src/Domain/Models/CreateFileModel";


class RemoteCreateFile implements CreateFile {
    create(model: CreateFileModel): Promise<any> {
        throw new Error("Method not implemented.");
    }

}

function makeSut(){
    
}

describe("RemoteCreateFile", () => {
    it("Should call create method with correct parameters",() => {

    })
})