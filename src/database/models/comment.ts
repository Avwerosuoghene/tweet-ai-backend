import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../db'; 
import Post from './post'; 

class Comment extends Model {
  public name!: string;
  public body!: string;
  public postId!: number;
}

Comment.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'Comments',
  timestamps: false,
});

Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

export default Comment;