import Autobot from '../models/autobot';

export const findAllAutobots = async () => {
  return await Autobot.findAll();
};

export const findAutobotById = async (id: number) => {
  return await Autobot.findByPk(id);
};

export const createAutobot = async (autobotData: {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}) => {
  return await Autobot.create(autobotData);
};

export const countAutobots = async () => {
  return await Autobot.count(); 
};