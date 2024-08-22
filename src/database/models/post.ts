import { DataTypes, Model } from 'sequelize';
import sequelize from '../db'; 
import Autobot from './autobot'; 

class Post extends Model {
  public title!: string;
  public body!: string;
  public userId!: number;
}

Post.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'Posts',
  timestamps: false,
});

Post.belongsTo(Autobot, { foreignKey: 'userId', as: 'autobot' });

export default Post;