import { Server } from 'socket.io';
import http from 'http';
import logger from '../utils/logger';
import { countAutobots } from '../database/repositories/autobotRepository';

let io: Server;



export const setupSocketIO = (server: http.Server) => {
    io = new Server(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
        },
      });
    

      io.on('connection', async (socket) => {
        try {
            const autobotCount = await countAutobots();
            
            socket.emit('autobotCount', { message: 'Fetching count...', autobotCount: autobotCount });
            
            logger.info('A user connected');
        } catch (error) {
            logger.error('Error fetching autobot count:', error);
            socket.emit('autobotCount', { message: 'Error fetching count', autobotCount: 0 });
        }

        socket.on('disconnect', () => {
            logger.info('User disconnected');
        });
    });
};

export const getSocketIO = () => io;