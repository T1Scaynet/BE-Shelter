const { Router } = require('express');
const { postComment, getComments, deleteComment, putComment } = require('../Controllers/commentController');

const router = Router();

router.post('/comment', postComment);
router.put('/comment/:id', putComment);
router.delete('/comment/:id', deleteComment);
router.get('/comment', getComments);

// router.get('/', pruebaGet)

module.exports = router;
