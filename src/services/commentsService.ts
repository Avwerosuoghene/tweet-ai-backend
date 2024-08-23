import { Request, Response } from 'express';

import { findCommentsByPostId } from "../database/repositories/commentRepository";
import { findPostById } from "../database/repositories/postRepository";
import logger from '../utils/logger';

const getPostComments = async (req: Request, res: Response) => {
    const postId = parseInt(req.params.postId);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

                logger.warn(`Post with ID ${postId} not found`);

    logger.info(`Received request to get comments for post ID ${postId} with pagination: page ${page}, limit ${limit}`);
  
    try {
      const post = await findPostById(postId);
      if (!post) {
        logger.warn(`Post with ID ${postId} not found`);
        return res.status(404).json({ message: `Post with ID ${postId} not found` });
      }
  
      const comments = await findCommentsByPostId(postId);
      if(!comments) {
        logger.warn(`No comments found for post ID ${postId}`);
        return res.status(404).json({ message: `No comment found for post with ID ${postId}`});
      }
  
      const paginatedComments = comments.slice((page - 1) * limit, page * limit);
      logger.info(`Successfully fetched ${paginatedComments.length} comments for post ID ${postId}`);

      res.json({ data: paginatedComments });
    } catch (error) {
      logger.error(`Failed to fetch comments for post ID ${postId}: ${error}`, { error });

      res.status(500).json({ message: `Failed to fetch comments for post with ID ${postId}`, error });
    }
  };

  export default {
    getPostComments
  }