import { Router } from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    addFriend,
    removeFriend
} from '../../controllers/userController.js';

const router = Router();

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).delete(deleteUser);

// /api/users/:userId/friends
router.route('/:userId/friends').post(addFriend);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);

export { router as userRouter };