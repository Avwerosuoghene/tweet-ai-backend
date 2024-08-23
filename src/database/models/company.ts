import { DataTypes, Model } from 'sequelize';
import sequelize from '../db'; 

class Company extends Model {
  public name!: string;
  public catchPhrase!: string;
  public bs!: string;
}

Company.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  catchPhrase: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bs: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Company',
  tableName: 'Companies',
  timestamps: false,
});


export default Company;