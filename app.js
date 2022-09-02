const express = require('express')
const app = express()
const cors = require('cors');

const journalEntries = [
    {id: 1, title: "My graduation", content: "Today was my graduation ceremony. I've graduated with a chemistry degree and i feel amazing. 3 years of hard work, staying up late revising, 8 hour sessions in the lab i'll miss it but im onto my next chapter.", emoji1: 0, emoji2: 0, emoji3: 0, gif: "https://media2.giphy.com/media/l41lSXyUa25Oah9Ek/giphy.gif?cid=790b7611cf287f515d2ccf43e004cc22c699be8d63a2e029&rid=giphy.gif&ct=g" },

    {id: 2, title: "I broke my friends code - AITA?", content: "We were designing a website that allows you to post anonymous blog entries. My friend worked on a feature to add emoji reactions, whilst I worked on testing. I moved one line of code, and now the whole page shows nothing. I understand this is my fault, but he hasnt spoken to me for 3 years now and I think this is an overreaction, as we could have just moved it back to make it work.  AITA?", emoji1: 0, emoji2: 0, emoji3: 0, gif: "https://media4.giphy.com/media/DoASNkgBr1iii4MkSq/giphy.gif?cid=790b7611da97d015506b2c38f5da3f078e0ad38d69ec6354&rid=giphy.gif&ct=g" },

    {id: 3, title: "I finished watching bojack horseman", content: "A friend recommended the show on netflix, and i am so sad that it is over!I've seen all of BoJack Horseman. For those that don't know, it is an animated comedy show on netflix about a horse, who tries to regain popularity in his life after running a successful career in his 70s.It's unstoppable; the latest season may be the best yet, and that's after oodles of human/animal behaviour at its peak. Sure, it's larger than life, riddled with laffs, too, but at the core there's something that I just haven't found with other series, and it makes me cry, scream-laugh, and everything in-between.", emoji1: 0, emoji2: 0, emoji3: 0, gif: "https://media4.giphy.com/media/uVz7iwTMSDR5e/giphy.gif?cid=99c11231typ1p4uydty34rrq8st5flfwa816erthbnvjhc29&rid=giphy.gif&ct=g" }
]

const comments = [
    {id: 1, content: "well done congrats!", entryId: 1, cEmoji1: 0, cEmoji2: 0},
    {id: 2, content: "Well done mate! You should consider going into software development!", entryId: 1, cEmoji1: 0, cEmoji2: 0},
    {id: 3, content: "A whole graduate?! That's lit big up to you!", entryId: 1, cEmoji1: 0, cEmoji2: 0},
    {id: 4, content: "yes you are the a******, shame", entryId: 2, cEmoji1: 0, cEmoji2: 0},
    {id: 5, content: "definitely TA. Is this not obvious? I don't know about you but me personally I could never take that betrayal. Absolutely horrid behaviour...", entryId: 2, cEmoji1: 0, cEmoji2: 0},
    {id: 6, content: "nah guys , it was an honest mistake. can't you just start over like its not that deep", entryId: 2, cEmoji1: 0, cEmoji2: 0},
    {id: 7, content: "booooooooo", entryId: 2, cEmoji1: 0, cEmoji2: 0},
    {id: 8, content: "i've come back to comment again. shame on you sir", entryId: 2, cEmoji1: 0, cEmoji2: 0},
    {id: 9, content: "3 years seems a bit much...", entryId: 2, cEmoji1: 0, cEmoji2: 0},
    {id: 10, content: "yeah Bojack is great I really enjoyed it.", entryId: 3, cEmoji1: 0, cEmoji2: 0},
    {id: 11, content: "hojack borseman", entryId: 3, cEmoji1: 0, cEmoji2: 0},
    {id: 12, content: "the show is about a horse??? yeah count me out thanks", entryId: 3, cEmoji1: 0, cEmoji2: 0},
    {id: 13, content: "What disease are horses most scared of getting? Hay fever", entryId: 3, cEmoji1: 0, cEmoji2: 0},
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

