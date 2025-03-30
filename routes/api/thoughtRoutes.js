import {Router} from 'express';
import{
getThoughts,
getThoughtById,
CreateThought,
updateThought,
deleteThought,
addReaction,
deleteReaction
} from '../../controllers/thoughtController.js';

const router= Router();
// /api/thoughts
router.route('/').get(getThoughts).post(CreateThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// /api/thoughts/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

// /api/thoughts/:thoughtId/reactions
router 
    .route('/:thoughtId/reactions')
    .post(addReaction);

export {router as thoughtRouter}