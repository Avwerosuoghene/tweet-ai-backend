import axios from 'axios';
import { Autobot, Post, Comment } from '../database';
import { sequelize } from '../database';

const fetchDataFromPlaceholder = async (endpoint: string) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/${endpoint}`);
  return data;
};

const createAutobots = async () => {
  const autobots = await fetchDataFromPlaceholder('users');
  
  for (const autobot of autobots.slice(0, 500)) { 
    await Autobot.create({
      id: autobot.id,
      name: autobot.name,
      username: autobot.username,
      email: autobot.email,
      phone: autobot.phone,
      website: autobot.website,
    });

    const posts = await fetchDataFromPlaceholder(`posts?userId=${autobot.id}`);
    
    for (const post of posts.slice(0, 10)) { 
      await Post.create({
        title: post.title,
        body: post.body,
        userId: autobot.id,
      });

      const comments = await fetchDataFromPlaceholder(`comments?postId=${post.id}`);
      
      for (const comment of comments.slice(0, 10)) { 
        await Comment.create({
          name: comment.name,
          body: comment.body,
          postId: post.id,
        });
      }
    }
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