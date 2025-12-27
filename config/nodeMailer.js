import nodemailer from 'nodemailer'
import {EMAIL_PASSWORD} from './env.js'

export const accountEmail= 'manukakavinda1110@gmail.com'
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'manukakavinda1110@gmail.com',
        password: EMAIL_PASSWORD
    }
})

export default transporter;