import { DataTypes, Model } from 'sequelize';
import sequelize from '../db'; 

class Post extends Model {
  public id!: number;
  public title!: string;
  public body!: string;
  public userId!: number;
}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Posts',
  timestamps: false,
});


export default Post;