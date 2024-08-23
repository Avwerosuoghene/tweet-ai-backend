import { Application, Router } from 'express';
import commentsService from './commentsService';
import autobotService from './autobotService';
import postsService from './postsService';

const router = Router();
const apiVersion = '/api/v1';
router.get('/autobots', autobotService.getAutobots);
router.get('/autobots/:id/posts', postsService.getAutobotPosts);
router.get('/posts/:postId/comments', commentsService.getPostComments);

export default (app: Application) => {
    app.use(apiVersion, router);
    return app;
};