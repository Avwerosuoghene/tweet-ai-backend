import sequelize, {syncDatabase, connectDb} from './db';
import Address from './models/adress';
import Autobot from './models/autobot';
import Comment from './models/comment';
import Company from './models/company';
import Post from './models/post';

Autobot.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Autobot.hasOne(Address, { foreignKey: 'autobotId', as: 'address' });
Autobot.hasOne(Company, { foreignKey: 'autobotId', as: 'company' });

Post.belongsTo(Autobot, { foreignKey: 'userId', as: 'autobot' });
Address.belongsTo(Autobot, { foreignKey: 'autobotId' });
Company.belongsTo(Autobot, { foreignKey: 'autobotId' });



Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });


const models = {
  Autobot,
  Post,
  Comment
};

export { sequelize, models, syncDatabase, connectDb };