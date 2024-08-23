import { Request, Response } from 'express';
import { Autobot, Post, Comment } from '../database';

const getAutobots = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  const autobots = await Autobot.findAll({
    limit,
    offset: (page - 1) * limit,
  });

  res.json({ data: autobots });
};

const getAutobotPosts = async (req: Request, res: Response) => {
  const autobotId = parseInt(req.params.id);
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  const posts = await Post.findAll({
    where: { userId: autobotId },
    limit,
    offset: (page - 1) * limit,
  });

  res.json({ data: posts });
};

const getPostComments = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId);
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  
  const comments = await Comment.findAll({
    where: { postId },
    limit,
    offset: (page - 1) * limit,
  });

  res.json({ data: comments });
};

export default {
  getAutobots,
  getAutobotPosts,
  getPostComments,
};