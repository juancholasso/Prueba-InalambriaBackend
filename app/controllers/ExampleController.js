import Mail from '../imports/Mail.js';

/**
 * ExampleController
 */
class ExampleController{

    constructor(){

    }


    async sendMail(){
        var mailOptions = {
            from: 'mrxhack1@gmail.com',
            to: 'juancholasso@hotmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
        await Mail.sendMail(mailOptions)
    }
   
}
//Get list with all roles

module.exports = ExampleController;
