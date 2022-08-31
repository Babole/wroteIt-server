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

    test('responds to post /journal-entries with status 201', (done) => {
        const testData = {
            title: 'Test title',
            content: 'Test content'
        }

        request(api)
            .post('/journal-entries')
            .send(testData)
            .set('Accept', 'application/json')
            .expect(201)
            .expect({ id: 3, ...testData, emoji1: 0, emoji2: 0, emoji3: 0 }, done)
    })

    test('responds to post /comments with status 201', (done) => {
        const testData = {
            content: 'Test content',
            entryId: 1
        }

        request(api)
            .post('/comments')
            .send(testData)
            .set('Accept', 'application/json')
            .expect(201)
            .expect({ id: 4, ...testData, cEmoji1: 0, cEmoji2: 0 }, done)
    })

    test('responds to patch /joirnal-entries/1 with status 200', (done) => {
        const testChange = {
            emoji1: 10,
            emoji2: 10,
            emoji3: 10
        }

        request(api)
            .patch('/journal-entries/1')
            .send(testChange)
            .set('Accept', 'application/json')
            .expect(200)
            .expect({ id: 1, title: "Test entry title 1", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error ea nostrum culpa earum quaerat quo? Reiciendis ratione aliquam eius, facere veritatis nulla architecto? Placeat quae iure rem at minima rerum atque inventore sint pariatur praesentium nam, corrupti, ratione asperiores magni. Id quia, illo commodi cum adipisci qui placeat? Ullam sed rerum enim voluptatibus veniam. Temporibus, perspiciatis fugit, labore nostrum, facere reiciendis doloremque in porro asperiores voluptates dicta voluptate possimus. Ipsa quas eum aut ipsum expedita nam facere. Consequatur dicta ab asperiores assumenda non ratione fugit ipsam totam vel. Autem velit est tempora qui amet ipsum doloremque magnam quas placeat aut.", ...testChange }, done)
    })

    test('responds to patch /comments/1 with status 200', (done) => {
        const testChange = {
            cEmoji1: 10,
            cEmoji2: 10
        }

        request(api)
            .patch('/comments/1')
            .send(testChange)
            .set('Accept', 'application/json')
            .expect(200)
            .expect({ id: 1, content: "This comment is for 1", entryId: 1, ...testChange }, done)
    })
}) 
