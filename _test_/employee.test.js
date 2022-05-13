const Employee = require('../lib/employee');


describe('Employee', () => {
    it('should be able to initialize the Employee Object', () => {
        const emp = new Employee('John', 1, 'John@gmail.com')
        expect(emp.getId()).toEqual(1)
        expect(emp.getName()).toEqual('John')
        expect(emp.getEmail()).toEqual('John@gmail.com')
        expect(emp.getRole()).toEqual('Employee')
    })
    it('should throw an error if employee is initialized with Empty string', () => {
        expect(() => {
            new Employee('', 1, 'John@gmail.com')
        }).toThrow('Name is not provided')
    })

    it('should throw an error if employee is initialized with null', () => {
        expect(() => {
            new Employee(null, 1, 'John@gmail.com')
        }).toThrow('Name is not provided')
    })
    it('should throw an error if employee is initialized with undefined', () => {
        expect(() => {
            new Employee(undefined, 1, 'John@gmail.com')
        }).toThrow('Name is not provided')
    })
    it('should throw an error if employee is initialized with ID is undefined', () => {
        expect(() => {
            new Employee("john", undefined, 'John@gmail.com')
        }).toThrow('Id is not a valid number')
    })
    it('should throw an error if employee is initialized with ID is undefined', () => {
        expect(() => {
            new Employee("john", null, 'John@gmail.com')
        }).toThrow('Id is not a valid number')
    })
    it('should throw an error if employee is initialized with ID is undefined', () => {
        expect(() => {
            new Employee("john", "1", 'John@gmail.com')
        }).toThrow('Id is not a valid number')
    })
    it('should throw an error if employee is initialized with Email ID without @ sign', () => {
        expect(() => {
            new Employee("john", 1, 'Johngmailcom')
        }).toThrow('Email Id is not a valid')
    })
})