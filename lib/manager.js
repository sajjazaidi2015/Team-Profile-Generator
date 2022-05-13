const Employee = require('./employee');

class Manager extends Employee{
    constructor(officeNumber){
        super(name, id, email);
        if(typeof officeNumber !== 'number' || id == null || id == undefined) {
            throw new Error('Id is not a valid number')
        } else {
            this.officeNumber = officeNumber;
        }
    }
    getOfficeNumber(){
        return this.officeNumber
    }
    getRole(){
        return 'Manager'
    }  
}
export default Manager;