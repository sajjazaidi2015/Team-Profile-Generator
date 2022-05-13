// This class is a parent class
class Employee{
    constructor(name, id, email){
        const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        const isValidEmail = EMAIL_REGEX.test(email);


        if(name == null || name.length <= 0) {
            throw new Error('Name is not provided')
        } else {
            this.name = name;
        }
        
        if(typeof id !== 'number' || id == null || id == undefined) {
            throw new Error('Id is not a valid number')
        } else {
            this.id = id;
        }
        if(isValidEmail) {
            this.email = email
        } else {
            throw new Error('Email Id is not a valid')
        }
    }
    getName(){
        return this.name
    }
    getId(){
        return this.id
    }
    getEmail(){
        return this.email
    }
    getRole(){
        return 'Employee'
    }
}

module.exports = Employee;