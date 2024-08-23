import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../db'; 

class Comments extends Model {
  public name!: string;
  public body!: string;
  public email!: string; 
  public postId!: number;
  public id!: number;

}

Comments.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'Comments',
  timestamps: false,
});


export default Comments;