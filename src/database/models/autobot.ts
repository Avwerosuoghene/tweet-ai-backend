import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../db'; 

class Autobot extends Model {
  public name!: string;
}

Autobot.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize, 
  tableName: 'Autobots',
  timestamps: false,
});

export default Autobot;