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
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

//Journal-Entry section

app.get('/journal-entries', (req, res) => res.send(journalEntries));

app.get('/journal-entries/:id', (req, res) => {
    try {
        const entryId = parseInt(req.params.id) 
        const selectedEntry = journalEntries.find(entry => entry.id === entryId)
        if(!selectedEntry){
            throw new Error('That entry does not exist!')
        }
        res.send(selectedEntry)
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
})

app.post('/journal-entries', (req, res) => {
    const newTitle = req.body.title
    const newContent = req.body.content
    const newId = journalEntries[journalEntries.length - 1].id + 1
    const newEntry = { id:newId, title: newTitle, content: newContent, comments: [] }

    journalEntries.push(newEntry)
    res.status(201).send(newEntry)
})

//Comments section

app.get('/comments', (req, res) => res.send(comments));

app.get('/comments/:id', (req, res) => {
    try {
        const commentId = parseInt(req.params.id) 
        const selectedComment = comments.find(comment => comment.id === commentId)
        if(!selectedComment){
            throw new Error('That comment does not exist!')
        }
        res.send(selectedComment)
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
})

module.exports = app

