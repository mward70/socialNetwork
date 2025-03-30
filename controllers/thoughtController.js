import { trusted } from 'mongoose';
import { Thought, User } from '../models/index.js';

//GET all thoughts
export const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//GET thought by ID
export const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) return res.status(404).json({ message: 'No thought found' });
        res.json(thought);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//POST a thought
export const CreateThought = async (req, res) => {
    try {
        const { thoughtText, username, userId } = req.body;

        const newThought = await Thought.create({ thoughtText, username });
        //push to user thought array
        await User.findByIdAndUpdate(
            userId,
            { $push: { thoughts: newThought._id } },
            { new: true }
        );

        res.status(201).jsosn(newThought);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

//PUT/update thought
export const updateThought = async (req, res) => {
    try {
        const updated = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ message: 'Thought not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//DELETE a thought
export const deleteThought = async (req, res) => {
    try {
        const deleted = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!deleted) return res.status(404).json({ message: 'Thought not found' });

        await User.findOneAndUpdate(
            { username: deleted.username },
            { $pull: { thoughts: deleted._id } }
        );
        res.json({ message: 'Thought deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//POST reaction
export const addReaction = async (req, res) => {
    try {
        const updated = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        );
        if (!updated) return res.status(404).json({ message: 'Thought not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//DELETE a reaction
export const deleteReaction = async (req, res) => {
    try {
        const updated = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Thought not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};