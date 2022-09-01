const express = require('express')
const app = express()
const cors = require('cors');

const journalEntries = [
    {id: 1, title: "Test entry title 1", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error ea nostrum culpa earum quaerat quo? Reiciendis ratione aliquam eius, facere veritatis nulla architecto? Placeat quae iure rem at minima rerum atque inventore sint pariatur praesentium nam, corrupti, ratione asperiores magni. Id quia, illo commodi cum adipisci qui placeat? Ullam sed rerum enim voluptatibus veniam. Temporibus, perspiciatis fugit, labore nostrum, facere reiciendis doloremque in porro asperiores voluptates dicta voluptate possimus. Ipsa quas eum aut ipsum expedita nam facere. Consequatur dicta ab asperiores assumenda non ratione fugit ipsam totam vel. Autem velit est tempora qui amet ipsum doloremque magnam quas placeat aut.", emoji1: 2, emoji2: 1, emoji3: 0, gif: "https://media4.giphy.com/media/5i7umUqAOYYEw/giphy.gif?cid=99c11231p9vk9zkfrvir0s93ffenz4h4sedt55x9yewgxwa9&rid=giphy.gif&ct=g" },

    {id: 2, title: "Test entry title 2", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error ea nostrum culpa earum quaerat quo? Reiciendis ratione aliquam eius, facere veritatis nulla architecto? Placeat quae iure rem at minima rerum atque inventore sint pariatur praesentium nam, corrupti, ratione asperiores magni. Id quia, illo commodi cum adipisci qui placeat? Ullam sed rerum enim voluptatibus veniam. Temporibus, perspiciatis fugit, labore nostrum, facere reiciendis doloremque in porro asperiores voluptates dicta voluptate possimus. Ipsa quas eum aut ipsum expedita nam facere. Consequatur dicta ab asperiores assumenda non ratione fugit ipsam totam vel. Autem velit est tempora qui amet ipsum doloremque magnam quas placeat aut.", emoji1: 2, emoji2: 1, emoji3: 0, gif: "https://media4.giphy.com/media/oDK8A6xUNjD2M/giphy.gif?cid=99c11231qbhrq7fjpkqbokyahtyknpo17pso5zq7jmurk224&rid=giphy.gif&ct=g" }
]

const comments = [
    {id: 1, content: "This comment is for 1", entryId: 1, cEmoji1: 2, cEmoji2: 1},
    {id: 2, content: "This comment is for 2", entryId: 2, cEmoji1: 2, cEmoji2: 1},
    {id: 3, content: "This comment is for 1", entryId: 1, cEmoji1: 2, cEmoji2: 1}

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
    const newGif = req.body.gif
    const newEntry = { id: newId, title: newTitle, content: newContent, emoji1: 0, emoji2: 0, emoji3: 0, gif: newGif }

    journalEntries.push(newEntry)
    res.status(201).send(newEntry)
})

app.patch('/journal-entries/:id', (req, res) => {
    try {
        const entryId = parseInt(req.params.id) 
        const selectedEntry = journalEntries.find(entry => entry.id === entryId)
        const changes = req.body
        if(!selectedEntry){
            throw new Error('That entry does not exist!')
        } else {
            Object.assign(selectedEntry, changes)
            res.status(200).json(selectedEntry)
        }
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
})

//Comments section

app.get('/comments', (req, res) => res.send(comments));

app.get('/comments/:id', (req, res) => {
    try {
        const commentId = parseInt(req.params.id) 
        const selectedComment = comments.find(comment => comment.id === commentId)
        if(!selectedComment){
            console.log(typeof selectedComment)
            throw new Error('That comment does not exist!')
        }
        console.log(typeof selectedComment)
        res.send(selectedComment)
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
})

app.get('/comments/eId/:id', (req, res) => {
    try {
        const commentEId = parseInt(req.params.id) 
        const selectedComments = comments.filter(comment => comment.entryId === commentEId)
        if(Object.keys(selectedComments).length === 0){
            console.log('in here')
            throw new Error('This entry has no comments!')
        }
        console.log(typeof selectedComments)
        res.send(selectedComments)
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
})

app.post('/comments', (req, res) => {
    const newContent = req.body.content
    const newEntryId = req.body.entryId
    const newId = comments[comments.length - 1].id + 1
    const newComment = { id: newId, content: newContent, entryId: newEntryId, cEmoji1: 0, cEmoji2: 0 }

    comments.push(newComment)
    res.status(201).send(newComment)
})

app.patch('/comments/:id', (req, res) => {
    try {
        const commentId = parseInt(req.params.id) 
        const selectedComment = comments.find(comment => comment.id === commentId)
        const changes = req.body
        if(!selectedComment){
            throw new Error('That comment does not exist!')
        } else {
            Object.assign(selectedComment, changes)
            res.status(200).json(selectedComment)
        }
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
})

module.exports = app

