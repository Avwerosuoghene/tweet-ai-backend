import sequelize from './db'; 

 export const  syncDatabase = async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); 
    console.log('Database & tables synchronized!');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    await sequelize.close();
  } 
}



