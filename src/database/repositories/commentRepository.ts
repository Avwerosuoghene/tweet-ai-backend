import Comment from '../models/comment';

export const findCommentsByPostId = async (postId: number) => {
  return await Comment.findAll({ where: { postId } });
};

export const createComment = async (commentData: {
  name: string;
  body: string;
  email: string;
  postId: number;
}) => {
  return await Comment.create(commentData);
};

