const Comment = require('../Models/comment');

const comment = {};

comment.postComment = (req, res) => {
  const idUser = req.userId;
  const { stars, comments, image } = req.body;

  if (!idUser || !stars) throw Error('Faltan datos');
  try {
    const newComment = new Comment({
      idUser,
      stars,
      comments,
      image
    });
    newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

comment.getComments = async (req, res) => {
  try {
    const allComments = await Comment.find().populate({ path: 'idUser', select: ['name', 'lastName', 'avatar'] });
    if (!allComments.length) throw Error('No hay comentarios existentes');
    res.status(200).json(allComments);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
comment.deleteComment = async (req, res) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    res.status(200).send(`El comentario con el id: ${deleted.id}, fue borrado exitosamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

comment.putComment = async (req, res) => {
  try {
    const updateComment = await Comment.findByIdAndUpdate(req.params.id, req.body);
    console.log(updateComment);
    res.status(200).send(`El comentario con el id: ${updateComment.id}, fue modificado exitosamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = comment;
