import { Router } from 'express';
import { getUser, getUsers } from '../controllers/userController';
import authorize from '../middleware/authMiddleware.js';

const userRouter = Router();

userRouter.get('/', getUsers)

userRouter.get('/:id', authorize, getUser)

userRouter.post('/', getUser)

userRouter.put('/:id', (req, res) => {
    res.send({
        title: 'Update user'
    })
})

userRouter.delete('/:id', (req, res) => {
    res.send({
        title: 'Delete user'
    })
})

export default userRouter;