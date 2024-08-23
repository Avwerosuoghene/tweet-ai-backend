import Autobot from '../models/autobot';

export const findAllAutobots = async () => {
  return await Autobot.findAll();
};

export const findAutobotById = async (id: number) => {
  return await Autobot.findByPk(id);
};