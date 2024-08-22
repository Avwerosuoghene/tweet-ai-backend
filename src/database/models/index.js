import sequelize from '../db'; 
import Autobot from './autobot';
import Post from './post';
import Comment from './comment';

Autobot.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(Autobot, { foreignKey: 'userId', as: 'autobot' });

Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

export { sequelize, Autobot, Post, Comment };