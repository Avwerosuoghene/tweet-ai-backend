import { createComment } from '../database/repositories/commentRepository';

export const addComment = async (commentData: any) => {
  return await createComment(commentData);
};