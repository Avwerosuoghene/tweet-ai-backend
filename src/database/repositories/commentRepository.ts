import Comment from '../models/comment';

export const findCommentsByPostId = async (postId: number) => {
  return await Comment.findAll({ where: { postId } });
};

