import { expect } from "chai";
import { DatabaseService } from "./database.service";

describe('databaseService', () => {
    let service:DatabaseService;

    beforeEach(() => {
        service = new DatabaseService();
    });

    it('should be created', () => {
        expect(service).to.not.be.eql(undefined);
    });

    it('should get plants by name', () => {
        service.getPlantsByName('tuberosum').then(result => {
            console.log('tuberosum','response[1].rows',result);
        });
    });

    it('should get plants by name and return no result', () => {
        service.getPlantsByName('asdfgfdsdfvgfdfghgfdsdf').then(result => {
            console.log('random name','response[1].rows',result);
        });
    });

	it('should get all Jardin', () => {
        service.getJardins().then(result => {
            console.log('all jardins in db','response:',result);
        });
    });

});
