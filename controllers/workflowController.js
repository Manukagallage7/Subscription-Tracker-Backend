import {createRequire} from 'module'
import dayjs from 'dayjs';
import Subscription from '../models/subscriptionModel.js';
const require = createRequire(import.meta.url);
const {server} = require('@upstash/workflow/express');
import {sendReminderEmail} from '../utils/sendEmail.js';

const REMINDERS = [7, 5, 2, 1]


export const sendReminders = server(async(context) => {
    const {subscriptionId} = context.requestPayload
    const subscription = await fetchSubscription(context, subscriptionId)

    if(!subscription || subscription.status !== 'active') return

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())) {
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stooping workflow`)
        return
    }
    
    for(const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day')

        if(reminderDate.isAfter(dayjs())) {
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before `, reminderDate)
        }

        await triggerReminder(context, `Reminder ${daysBefore} days before`)
    }
})

const fetchSubscription = async(context, subscriptionId) => {
    return (
        await context.run('get subscription', async()=> {
            return (
                Subscription.findById(subscriptionId).populate( 'user','name email')
            )
        })
    )
}
const sleepUntilReminder = async(context, label, date) => {
    console.log(`Sleeping unitl ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate())
}

const triggerReminder = async(context, label, subscription) => {
    return (
        await context.run(label, async() => {
            console.log(`Triggering ${label} reminder`)

            await sendReminderEmail({
                to: subscription.user.email,
                type: label,
                subscription,
            })
        })
    )
}