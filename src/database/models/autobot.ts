import { DataTypes, Model } from 'sequelize';
import sequelize from '../db'; 

class Autobot extends Model {
    public id!: number;
    public name!: string;
    public username!: string;
    public email!: string;
    public phone!: string;
    public website!: string;
  }

  Autobot.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Autobot',
    tableName: 'Autobots',
    timestamps: false,
  });

export default Autobot;