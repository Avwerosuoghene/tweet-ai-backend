import axios from 'axios';

import { createAutobot } from '../database/repositories/autobotRepository';
import { createComment } from '../database/repositories/commentRepository';
import { createPost } from '../database/repositories/postRepository';
import logger from '../utils/logger';
import { Autobot, Post } from '../database';
import Comments from '../database/models/comment';

const fetchDataFromPlaceholder = async (endpoint: string) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/${endpoint}`);
  return data;
};

const createAutobots = async () => {
  try {
    const autobots = await fetchDataFromPlaceholder('users');
    logger.info('Fetched autobots from placeholder');

    const autobotsToCreate = autobots.slice(0, 500);

    await Promise.all(autobotsToCreate.map(async (autobot: Autobot) => {
      try {
        await createAutobot({
          name: autobot.name,
          username: autobot.username,
          email: autobot.email,
          phone: autobot.phone,
          website: autobot.website,
        });
        logger.info(`Created Autobot with ID ${autobot.id}`);

        const posts = await fetchDataFromPlaceholder(`posts?userId=${autobot.id}`);
        logger.info(`Fetched posts for Autobot with ID ${autobot.id}`);

        // Create posts concurrently
        await Promise.all(posts.slice(0, 10).map(async (post: Post) => {
          try {
            await createPost({
              title: post.title,
              body: post.body,
              userId: autobot.id,
            });
            logger.info(`Created Post for Autobot with ID ${autobot.id}`);

            const comments = await fetchDataFromPlaceholder(`comments?postId=${post.id}`);
            logger.info(`Fetched comments for Post ID ${post.id}`);

            // Create comments concurrently
            await Promise.all(comments.slice(0, 10).map(async (comment: Comments) => {
              try {
                await createComment({
                  name: comment.name,
                  body: comment.body,
                  postId: post.id,
                  email: autobot.email
                });
                logger.info(`Created Comment for Post ID ${post.id}`);
              } catch (error) {
                logger.error(`Error creating Comment for Post ID ${post.id}: ${error}`);
              }
            }));
          } catch (error) {
            logger.error(`Error creating Post for Autobot with ID ${autobot.id}: ${error}`);
          }
        }));
      } catch (error) {
        logger.error(`Error creating Autobot with ID ${autobot.id}: ${error}`);
      }
    }));

    logger.info('Completed creating Autobots, Posts, and Comments');
  } catch (error) {
    logger.error('Error in createAutobots function:', error);
  }
};

const startBackgroundProcess = () => {
  setInterval(async () => {
    try {
      await createAutobots();
      console.log('500 Autobots, 5000 Posts, and 50000 Comments created.');
    } catch (err) {
      console.error('Error in background process:', err);
    }
  }, 3600000); 
};

export default startBackgroundProcess;