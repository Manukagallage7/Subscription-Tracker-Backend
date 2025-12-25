import {Router} from 'express';

const subscriptionRouter = Router()

subscriptionRouter.get('/', (req, res) => {
    res.send({
        title: 'Get All Subscription'
    })
})

subscriptionRouter.get('/:id', (req, res) => {
    res.send({
        title: 'Get Specific Subscription'
    })
})

subscriptionRouter.post('/', (req, res) => {
    res.send({
        title: 'Create Subscription'
    })
})

subscriptionRouter.put('/:id', (req, res) => {
    res.send({
        title: 'Update Subscription'
    })
})

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({
        title: 'Delete Subscription'
    })
})

subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({
        title: 'Get All User Subscription'
    })
})

subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({
        title: 'Cancel Subscription'
    })
})

subscriptionRouter.get('/:id', (req, res) => {
    res.send({
        title: 'Get upcoming renewals'
    })
})

export default subscriptionRouter;