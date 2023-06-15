const express = require('express')
const subscriber = require('../models/subscriber')
const router = express.Router()
const Subscriber = require('../models/subscriber')

router.use(express.json())

// Getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch(error) {
        res.status(500).json({ message: error.message})
    }
})

// Getting one
router.get('/:id', getSubscriber, (req, res) => {
    res.send(res.subscriber)
})

// Creating one
router.post('/', async (req, res) => {
    try {
        const sub = new Subscriber({
            name: req.body.name,
            subscribedToChannel: req.body.subscribedToChannel,
        })
        const newSub = await sub.save()
        res.status(201).json(newSub)
    } catch (error){
        console.log(error)
        res.status(400).json(error)
    }
})
// this is my 1st change

// Updating one
router.patch('/:id', getSubscriber, async (req, res) => {
    if(req.body.name != null) {
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel !== null) {
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel 
    }

    try {
        const updateSub = await res.subscriber.save()
        res.json(updateSub)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({ message: 'delete subscriber'})
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
})

// middleware
async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber === null){
            return res.status(404).json({ message: 'Cannot find subscriber'})
        }
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }
    res.subscriber = subscriber;
    next();
}


module.exports = router