
import RedisAdapter from "../../Infra/Repository/RedisAdapter";
import TodoModel from "src/Domain/Models/TodoModel";
import { makeTodoModel } from "../../DataTests/Helpers";
import { DomainMessages } from "src/Domain/Errors/DomainMessages";
import { DomainError } from "src/Domain/Errors/DomainErrors";

var redis = require("redis-mock")

const client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});


describe('RedisAdapter', () => {
  
    it('add: it should save todo with correct data', async () => {    
        const adapter = new RedisAdapter<TodoModel>({destination:'REDIS',client})

        const model = makeTodoModel({})
        const response = await adapter.insertData(model); 

        expect(response.message).toBe(DomainMessages.inserted_with_success)
    });

    it('add: it should parse an error message', async () => {    

        const adapter = new RedisAdapter<TodoModel>({destination:'REDIS',client:{...client, throwError:true}})

        const model = makeTodoModel({})
          await adapter.insertData(model).catch(err => {
            expect(err).toBe(DomainError.unexpected)
        })
    });


    it('remove: it should delete a todo correctly', async () => { 
        const adapter = new RedisAdapter<TodoModel>({destination:'REDIS',client})

        const response = await adapter.removeData("FILIPE_KERTCHER")

        expect(response.message).toBe(DomainMessages.removed_with_success)
        
    });

    it('remove: it should parse an error message', async () => {    

        const adapter = new RedisAdapter<TodoModel>({destination:'REDIS',client:{...client, throwError:true}})

        await adapter.removeData("FILIPE_KERTCHER").catch(err => {
            expect(err).toBe(DomainError.unexpected)
        })

    });

    it('update: it should update todo with correct data', async () => {
        const adapter = new RedisAdapter<TodoModel>({destination:'REDIS',client})

        const model = makeTodoModel({})
        const response = await adapter.updateData("FILIPE_KERTCHER",model)

        expect(response.message).toBe(DomainMessages.updated_with_success)
    });

    it('update: it should parse an error message', async () => {    

        const adapter = new RedisAdapter<TodoModel>({destination:'REDIS',client:{...client, throwError:true}})

        const model = makeTodoModel({})
        await adapter.updateData("FILIPE_KERTCHER",model).catch(err => {
            expect(err).toBe(DomainError.unexpected)
        })
        
    });


    it('list: it should list todos correctly', async () => {
         
        const adapter = new RedisAdapter<TodoModel>({destination:'REDIS',client})
        const response = await adapter.listData("FILIPE_KERTCHER")

        expect(response.data).not.toBe(null)
        
    });

    it('list: it should parse an error message', async () => {    

        const adapter = new RedisAdapter<TodoModel>({destination:'REDIS',client:{...client, throwError:true}})

        await adapter.listData("FILIPE_KERTCHER").catch(err => {
            expect(err).toBe(DomainError.unexpected)
        })
        
    });
});



 

