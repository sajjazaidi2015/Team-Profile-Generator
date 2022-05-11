const Employee = require('./employee');

class Engineer extends Employee{
    constructor(username){
        super(name, id, email);
        this.username = username
    }
    getGithub(){
        return this.username
    }
    getRole(){
        return 'Engineer'
    }  
}
export default Engineer