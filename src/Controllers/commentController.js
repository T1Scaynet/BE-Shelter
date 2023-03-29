const { request, response } = require('express');
const Comment = require('../Models/comment');

const postComment = (req = request, res = response) => {
  const idUser = req.userId;
  const { comments } = req.body;

  console.log(idUser);
  if (!idUser) throw Error('Faltan datos');
  try {
    const newComment = new Comment({
      idUser,
      comments
    });
    newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getComments = async (req = request, res = response) => {
  try {
    const allComments = await Comment.find({});
    if (!allComments.length) throw Error('No hay comentarios existentes');
    res.status(200).json(allComments);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteComment = async (req = request, res = response) => {
  try {
    const deleted = await Comment.findByIdAndDelete(req.params.id);
    res.status(200).send(`El comentario con el id: ${deleted.id}, fue borrado exitosamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const putComment = async (req = request, res = response) => {
  try {
    const updateComment = await Comment.findByIdAndUpdate(req.params.id, req.body);
    console.log(updateComment);
    res.status(200).send(`El comentario con el id: ${updateComment.id}, fue modificado exitosamente`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  postComment,
  getComments,
  deleteComment,
  putComment
};
