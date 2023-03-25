const { Router } = require('express');
const { postComment, getComments, deleteComment, putComment } = require('../Controllers/commentController');
const { authToken } = require('../Middlewares/authToken');

const router = Router();

// CLIENT --
router.post('/', authToken, postComment);
router.put('/:id', authToken, putComment);
router.delete('/:id', authToken, deleteComment);
router.get('/', getComments);

module.exports = router;
