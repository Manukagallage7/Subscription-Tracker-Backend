import { Routes } from 'express';
import {semiReminders} from '../controllers/workflowController.js'

const workflowRouter = Router()

workflowRouter.get('/subscription/reminder', semiReminders)

export default workflowRouter;