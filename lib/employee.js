// This class is a parent class
class Employee{
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email
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
const employee = new Employee("sajjad", 1, 'sajjadzaidi2015@gmail.com')
console.log(employee)

module.exports = Employee;