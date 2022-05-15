const Intern = require('../lib/intern');

describe('Intern', () => {
    it('should be able to initialize the Intern Object', () => {
        const int = new Intern(1, "John", "john@gmail.com", "John")
        expect(int.getSchool()).toEqual("John")
        expect(int.getRole()).toEqual('Intern')
    })

    it('should throw an error if En is initialized with Username  is undefined', () => {
        expect(() => {
            const int = new Intern(1, "John", "john@gmail.com", undefined)
        }).toThrow('School is not provided')
    })
    it('should throw an error if En is initialized with username  is null', () => {
        expect(() => {
            const int = new Intern(1, "John", "john@gmail.com", null)
        }).toThrow('School is not provided')
    })

})