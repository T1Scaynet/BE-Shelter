const { Router } = require('express');
const { postComment, getComments, deleteComment, putComment } = require('../Controllers/commentController');

const router = Router();

// CLIENT --
router.post('/', postComment);
router.put('/:id', putComment);
router.delete('/:id', deleteComment);
router.get('/', getComments);

module.exports = router;
