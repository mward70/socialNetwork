// //User CRUD Operations
// import { trusted } from 'mongoose';?
import { Thought, User } from '../models/index.js';

//GET /api/users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .populate('thoughts')
            .populate('friends');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//return all users
//pop. thoughts and friends

//getUserById
//GET /api/users/:userId
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate('thoughts')
            .populate('friends');
        if (!user) return res.status(404).json({ message: 'User not found.' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//return 1 user by _id
//pop. thoughts and friends
//return 404 if user not found

//createUser
//POST /api/users
export const createUser = async (req, res) => {
    try {
        const { username, email } = req.body;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        // Create new user
        const newUser = await User.create({ username, email });

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//accept username and email
//validate email format
//return created user

//updateUser
export const updateUser = async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ message: 'User not found.' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//PUT /api/users/:userId
//update user data by _id
//return updated user
//run validators 

//deleteUser
export const deleteUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.userId);
        if (!deleted) return res.status(404).json({ message: 'User not found.' });
        //ALSO delete all their thoughts
        await Thought.deleteMany({ userId: deleted._id })

        res.json({ message: 'User deleted.' })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//DELETE /api/users/:userId
//delete user by _id
//return success message

//Friend Operations

//addFriend
//POST /api/users/:userId/friends/:friendId
export const addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;

        // Prevent adding the same friend twice
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        const friend = await User.findById(friendId);
        if (!friend) return res.status(404).json({ message: 'Friend not found' });

        if (user.friends.includes(friendId)) {
            return res.status(400).json({ message: 'Friend already added.' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { friends: friendId } },
            { new: true }
        ).populate('friends');

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//removeFriend
//DELETE /api/users/:userId/friends/:friendId
export const removeFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.params;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        const friend = await User.findById(friendId);
        if (!friend) return res.status(404).json({ message: 'Friend not found' });

        if (!user.friends.includes(friendId)) {
            return res.status(400).json({ message: 'Friend not found in user\'s friend list.' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { new: true }
        ).populate('friends');

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
