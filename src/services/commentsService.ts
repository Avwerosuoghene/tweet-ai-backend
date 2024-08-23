import { Request, Response } from 'express';

import { findCommentsByPostId } from "../database/repositories/commentRepository";
import { findPostById } from "../database/repositories/postRepository";

const getPostComments = async (req: Request, res: Response) => {
    const postId = parseInt(req.params.postId);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
  
    try {
      const post = await findPostById(postId);
      if (!post) {
        return res.status(404).json({ message: `Post with ID ${postId} not found` });
      }
  
      const comments = await findCommentsByPostId(postId);
      if(!comments) {
        return res.status(404).json({ message: `No comment found for post with ID ${postId}`});
      }
  
      const paginatedComments = comments.slice((page - 1) * limit, page * limit);
  
      res.json({ data: paginatedComments });
    } catch (error) {
      res.status(500).json({ message: `Failed to fetch comments for post with ID ${postId}`, error });
    }
  };

  export default {
    getPostComments
  }