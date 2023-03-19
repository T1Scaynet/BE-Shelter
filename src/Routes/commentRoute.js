const { Router } = require('express');
const { postComment, getComments, deleteComment, putComment } = require('../Controllers/commentController');

const router = Router();

router.post('/', postComment);
router.put('/:id', putComment);
router.delete('/:id', deleteComment);
router.get('/', getComments);

// router.get('/', pruebaGet)

module.exports = router;
