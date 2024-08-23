import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../db'; 

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
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Comments',
  timestamps: false,
});


export default Comment;