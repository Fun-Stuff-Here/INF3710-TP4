import { StatusCodes } from 'http-status-codes';
import * as supertest from 'supertest';
import { Application } from '../app';
import { DatabaseService } from '../services/database.service';
import { DatabaseController } from './database.controller';

const HTTP_STATUS_OK = StatusCodes.OK;


describe('DatabaseController', () => {
    let expressApp: Express.Application;

    beforeEach(async () => {
        const app = new Application(new DatabaseController(new DatabaseService()));
        expressApp = app.app;
    });

    it('should return message from example service on valid get request to root', async () => {
        return supertest(expressApp)
            .get('/api/database/plant/tuberosum/')
            .expect(HTTP_STATUS_OK)
            .then((response) => {
               console.log('response.body',response.body);
            });
    });

});
