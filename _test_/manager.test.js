const Manager = require('../lib/manager');

describe('Manager', () => {
    it('should be able to initialize the Manager Object', () => {
        const man = new Manager(1)
        expect(man.getOfficeNumber()).toEqual(1)
    })

    it('should throw an error if employee is initialized with ID is undefined', () => {
        expect(() => {
            new Manager(undefined)
        }).toThrow('Id is not a valid number')
    })
    // it('should throw an error if employee is initialized with ID is undefined', () => {
    //     expect(() => {
    //         new Employee("john", null, 'John@gmail.com')
    //     }).toThrow('Id is not a valid number')
    // })

})