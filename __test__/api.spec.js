const request = require('supertest');
const app = require('../app')

describe('api server', () => {
    let api;

    beforeAll(() => {
        api = app.listen(5000, () => {
            console.log('Test server running on port 5000')
        })
    })

    afterAll((done) => {
        console.log('Gracefully stopping test server')
        api.close(done)
    })

    test('it responds to get / with a 200 status', (done) => {
        request(api)
            .get('/')
            .expect(200, done)
    })
    
    test('it responds to get /journal-entries with status 200', (done) => {
        request(api)
            .get('/journal-entries')
            .expect(200, done)
    })

    test('responds to get entry id with status 200', (done) => {
        request(api)
            .get('/journal-entries/2')
            .expect(200, done)
    })

    test('it responds to get /comments with status 200', (done) => {
        request(api)
            .get('/comments')
            .expect(200, done)
    })

    test('responds to a unknown comment id with a 404', (done) => {
        request(api)
            .get('/comments/42')
            .expect(404)
            .expect({ message: 'That comment does not exist!' }, done)
    })
})
