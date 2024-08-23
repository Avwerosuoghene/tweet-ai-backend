import { Application, Router } from 'express';
import autobotService from '../services/autobotService';

const router = Router();
const apiVersion = '/api/v1';

/**
 * @openapi
 * /api/example:
 *   get:
 *     summary: Retrieve a list of examples
 *     responses:
 *       200:
 *         description: A list of examples
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/autobots', autobotService.getAutobots);
router.get('/autobots/:id/posts', autobotService.getAutobotPosts);
router.get('/posts/:postId/comments', autobotService.getPostComments);

export default (app: Application) => {

    app.use(apiVersion, router);

    return app
}

