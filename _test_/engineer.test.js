const Engineer = require('../lib/engineer');

describe('Engineer', () => {
    it('should be able to initialize the Engineer Object', () => {
        const eng = new Engineer(1, "John", "john@gmail.com", "John")
        expect(eng.getGithub()).toEqual("John")
        expect(eng.getRole()).toEqual('Engineer')
        expect(eng.getIcon()).toEqual('fas fa-user-alt')
    })

    it('should throw an error if En is initialized with Username  is undefined', () => {
        expect(() => {
            const eng = new Engineer(1, "John", "john@gmail.com", undefined)
        }).toThrow('Username is not provided')
    })
    it('should throw an error if En is initialized with username  is null', () => {
        expect(() => {
            const eng = new Engineer(1, "John", "john@gmail.com", null)
        }).toThrow('Username is not provided')
    })

})