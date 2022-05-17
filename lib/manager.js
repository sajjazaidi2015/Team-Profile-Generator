const Employee = require('./employee');

class Manager extends Employee{
    constructor(id, name,  email, officeNumber){
        super(id, name, email);
        if(typeof officeNumber !== 'number' || id == null || id == undefined) {
            throw new Error('Office number is not a valid number')
        } else {
            this.officeNumber = officeNumber;
        }
    }
    getOfficeNumber() {
        return this.officeNumber
    }
    getRole(){
        return 'Manager'
    }  
    getIcon() {
        return 'fas fa-user-tie'
    }
}
module.exports = Manager;