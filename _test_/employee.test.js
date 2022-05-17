const Employee = require('../lib/employee');


describe('Employee', () => {
    it('should be able to initialize the Employee Object', () => {
        const emp = new Employee(1, 'John', 'John@gmail.com')
        expect(emp.getId()).toEqual(1)
        expect(emp.getName()).toEqual('John')
        expect(emp.getEmail()).toEqual('John@gmail.com')
        expect(emp.getRole()).toEqual('Employee')
        expect(emp.getIcon()).toEqual('fas fa-user-alt')
    })
    it('should throw an error if employee is initialized with Empty string name', () => {
        expect(() => {
            new Employee(1,'','John@gmail.com')
        }).toThrow('Name is not provided')
    })

    it('should throw an error if employee is initialized with null name', () => {
        expect(() => {
            new Employee(1,null,'John@gmail.com')
        }).toThrow('Name is not provided')
    })
    it('should throw an error if employee is initialized with undefined name', () => {
        expect(() => {
            new Employee(1,undefined, 'John@gmail.com')
        }).toThrow('Name is not provided')
    })
    it('should throw an error if employee is initialized with ID is undefined', () => {
        expect(() => {
            new Employee(undefined,"john", 'John@gmail.com')
        }).toThrow('Id is not a valid number')
    })
    it('should throw an error if employee is initialized with ID is null', () => {
        expect(() => {
            new Employee(null, "john", 'John@gmail.com')
        }).toThrow('Id is not a valid number')
    })
    it('should throw an error if employee is initialized with ID is string', () => {
        expect(() => {
            new Employee("1", "john", 'John@gmail.com')
        }).toThrow('Id is not a valid number')
    })
    it('should throw an error if employee is initialized with Email ID without @ sign', () => {
        expect(() => {
            new Employee(1, "john", 'Johngmailcom')
        }).toThrow('Email Id is not a valid')
    })
})