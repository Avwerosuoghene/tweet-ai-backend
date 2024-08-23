import { DataTypes, Model } from 'sequelize';
import sequelize from '../db'; 

class Address extends Model {
  public street!: string;
  public suite!: string;
  public city!: string;
  public zipcode!: string;
  public lat!: string;
  public lng!: string;
}

Address.init({
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  suite: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zipcode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lng: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Address',
  tableName: 'Addresses',
  timestamps: false,
});


export default Address;