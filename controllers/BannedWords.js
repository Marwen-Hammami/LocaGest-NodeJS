import BannedWords from "../models/BannedWords.js"


export function getAll(req, res) {
    BannedWords
    .find()
    .then(listBannedWords => {
        res.status(200).json(listBannedWords)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}

export function addOne(req, res) {
    req.body.word = req.body.word.toLowerCase();
    BannedWords
    .create(req.body)
    .then(newBannedWord => {
        res.status(200).json(newBannedWord)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}

export function deleteOne(req, res) {
    BannedWords
    .findOneAndRemove({ "_id" : req.params.id})
    .then(bannedWord => {
        res.status(200).json(bannedWord)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}

export function updateOne(req, res) {
    BannedWords
    .findById(req.body._id)
    .then(bannedWord => {
        if(req.body.usedCount) {
            bannedWord.usedCount = req.body.usedCount
        } else {
            bannedWord.usedCount += 1
        }
        bannedWord.save()
        res.status(200).json(bannedWord)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
  }