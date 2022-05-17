const Manager = require('../lib/manager');

describe('Manager', () => {
    it('should be able to initialize the Manager Object', () => {
        const man = new Manager(1, "John", "john@gmail.com", 12)
        expect(man.getOfficeNumber()).toEqual(12)
        expect(man.getRole()).toEqual('Manager')
        expect(man.getIcon()).toEqual('fas fa-user-tie')
    })

    it('should throw an error if employee is initialized with office id is undefined', () => {
        expect(() => {
            const man = new Manager(1, "John", "john@gmail.com", undefined)
        }).toThrow('Office number is not a valid number')
    })
    it('should throw an error if employee is initialized with office id is null', () => {
        expect(() => {
            const man = new Manager(1, "John", "john@gmail.com", null)
        }).toThrow('Office number is not a valid number')
    })

})

