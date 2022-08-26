const express = require('express')
const app = express()
const cors = require('cors');

const journalEntries = [
    {id: 1, title: "Test entry title 1", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error ea nostrum culpa earum quaerat quo? Reiciendis ratione aliquam eius, facere veritatis nulla architecto? Placeat quae iure rem at minima rerum atque inventore sint pariatur praesentium nam, corrupti, ratione asperiores magni. Id quia, illo commodi cum adipisci qui placeat? Ullam sed rerum enim voluptatibus veniam. Temporibus, perspiciatis fugit, labore nostrum, facere reiciendis doloremque in porro asperiores voluptates dicta voluptate possimus. Ipsa quas eum aut ipsum expedita nam facere. Consequatur dicta ab asperiores assumenda non ratione fugit ipsam totam vel. Autem velit est tempora qui amet ipsum doloremque magnam quas placeat aut.", comments: [1,3]},

    {id: 2, title: "Test entry title 2", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error ea nostrum culpa earum quaerat quo? Reiciendis ratione aliquam eius, facere veritatis nulla architecto? Placeat quae iure rem at minima rerum atque inventore sint pariatur praesentium nam, corrupti, ratione asperiores magni. Id quia, illo commodi cum adipisci qui placeat? Ullam sed rerum enim voluptatibus veniam. Temporibus, perspiciatis fugit, labore nostrum, facere reiciendis doloremque in porro asperiores voluptates dicta voluptate possimus. Ipsa quas eum aut ipsum expedita nam facere. Consequatur dicta ab asperiores assumenda non ratione fugit ipsam totam vel. Autem velit est tempora qui amet ipsum doloremque magnam quas placeat aut.", comments: [2]}
]

const comments = [
    {id: 1, content: "This comment is for 1"},
    {id: 2, content: "This comment is for 2"},
    {id: 3, content: "This comment is for 1"},

]

app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/journal-entries', (req, res) => res.send(journalEntries));

module.exports = app

