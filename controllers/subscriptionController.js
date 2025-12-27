import Subscription from '../models/subscriptionModel.js';
import {workflowClient} from '../config/upstash.js';

export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({
            ...req.bod,
            user: req.user._id
        })

        await workflowClient.trigger( {url, body, headers, workflowRunId, retries} : {
            url: `${SERVER_URL}`
        })

        res.status(201).json({
            success: true,
            data: subscription
        })
    } catch(err) {
        next(err)
    }
}

export const getUserSubscription = async (req, res, next) => {
    try {
        if(req.user.id !== req.params.id) {
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }

        const subscription = await Subscription.find({
            usr: req.params.id
        })

        res.status(200).json({
            success: true,
            data: subscription
        })
    } catch (err) {
        next(err)
    }
}
