import mongoose from 'mongoose';
import dayjs from 'dayjs';

const reactionSchema = new mongoose.Schema({
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dayjs(timestamp).format('MMM D, YYYY [at] h:mm A')
    }
}, {
    toJSON: { getters: true },
    id: false
});

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dayjs(timestamp).format('MMM D, YYYY [at] h:mm A')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: { virtuals: true, getters: true },
    id: false
});

// Virtual: reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);
export default Thought;
