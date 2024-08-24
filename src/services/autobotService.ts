import { Request, Response } from 'express';
import { countAutobots, findAllAutobots } from '../database/repositories/autobotRepository';
import logger from '../utils/logger';

const getAutobots = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  logger.info(`Received request to fetch autobots: page=${page}, limit=${limit}`);


  try {
    const autobots = await findAllAutobots();
    const paginatedAutobots = autobots.slice((page - 1) * limit, page * limit);
    logger.info(`Successfully fetched autobots: count=${paginatedAutobots.length}`);

    res.json({ data: paginatedAutobots });
  } catch (error) {
    logger.error(`Failed to fetch autobots: ${error}`, { error });

    res.status(500).json({ message: 'Failed to fetch autobots', error });
  }
};

export const getAutobotCount = async (req: Request, res: Response) => {
  try {
    logger.info(`Received request to fetch autobots count`);

    const count = await countAutobots();

    logger.info(`Successfully fetched autobots count: count=${count}`);

    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Autobots count' });
  }
};


export default {getAutobots, getAutobotCount}


