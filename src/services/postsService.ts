import { Request, Response } from 'express';
import { findPostsByUserId } from '../database/repositories/postRepository';
import { findAutobotById } from '../database/repositories/autobotRepository';


const getAutobotPosts = async (req: Request, res: Response) => {
    const autobotId = parseInt(req.params.id);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
  
    try {
        const autobot = await findAutobotById(autobotId);
        if (!autobot) {
          return res.status(404).json({ message: `Autobot with ID ${autobotId} not found` });
        }
      const posts = await findPostsByUserId(autobotId);
      if(!posts) {
        return res.status(404).json({ message: `No post found for autobot with ID ${autobotId}` });

      }
      const paginatedPosts = posts.slice((page - 1) * limit, page * limit);
  
      res.json({ data: paginatedPosts });
    } catch (error) {
      res.status(500).json({ message: `Failed to fetch posts for Autobot ID ${autobotId}`, error });
    }
  };

  export default {
    getAutobotPosts
  }
  