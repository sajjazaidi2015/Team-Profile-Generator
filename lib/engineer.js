const Employee = require('./employee');

class Engineer extends Employee{
    constructor(id, name,  email, username){
        super(id, name, email);
        if(username == null || username.length <= 0) {
            throw new Error('Username is not provided')
        } else {
            this.username = username;
        }
        
    }
    getGithub(){
        return this.username
    }
    getRole(){
        return 'Engineer'
    }  
    getIcon() {
        return 'fas fa-user-alt';
    }
}
module.exports = Engineer