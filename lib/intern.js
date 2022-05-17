const Employee = require('./employee');

class Intern extends Employee{
    constructor(id, name,  email, school){
        super(id, name, email);
        if(school == null || school.length <= 0) {
            throw new Error('School is not provided')
        } else {
            this.school = school;
        }
        
    }
    getSchool
    (){
        return this.school
    }
    getRole(){
        return 'Intern'
    } 
    getIcon() {
        return 'fas fa-user-graduate';
    } 
}
module.exports = Intern