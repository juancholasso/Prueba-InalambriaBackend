import ExampleController from '../controllers/ExampleController';
import fs from 'fs';
/**
 * Services for app web
 */

class ExampleService{

    constructor(){
       this.exampleController = new ExampleController;
    }
   
}

module.exports = ExampleService;
