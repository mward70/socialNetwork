import { Router } from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    addFriend,
    removeFriend,
    updateUser
} from '../../controllers/userController.js';

const router = Router();

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend);

export { router as userRouter };