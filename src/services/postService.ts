import { findPostById } from '../database/repositories/postRepository';
import { findCommentsByPostId } from '../database/repositories/commentRepository';

export const getPostById = async (id: number) => {
  return await findPostById(id);
};

export const getPostComments = async (postId: number) => {
  return await findCommentsByPostId(postId);
};