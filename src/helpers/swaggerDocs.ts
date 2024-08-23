/**
 * @swagger
 * tags:
 *   name: Autobots
 *   description: Autobot management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Autobot:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - username
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: The Autobot ID
 *         name:
 *           type: string
 *           description: The Autobot name
 *         username:
 *           type: string
 *           description: The Autobot username
 *         email:
 *           type: string
 *           description: The Autobot email
 *         phone:
 *           type: string
 *           description: The Autobot phone number
 *         website:
 *           type: string
 *           description: The Autobot website
 *       example:
 *         id: 1
 *         name: Optimus Prime
 *         username: optimus
 *         email: optimus@autobots.com
 *         phone: "555-555-5555"
 *         website: "www.autobots.com"
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - body
 *         - userId
 *       properties:
 *         id:
 *           type: integer
 *           description: The post ID
 *         title:
 *           type: string
 *           description: The post title
 *         body:
 *           type: string
 *           description: The post body content
 *         userId:
 *           type: integer
 *           description: The ID of the Autobot who created the post
 *       example:
 *         id: 1
 *         title: "A Brave New World"
 *         body: "This is a new dawn for Autobots."
 *         userId: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - body
 *         - postId
 *       properties:
 *         id:
 *           type: integer
 *           description: The comment ID
 *         name:
 *           type: string
 *           description: The commenter's name
 *         body:
 *           type: string
 *           description: The comment body content
 *         email:
 *           type: string
 *           description: The email of the comment autobot content
 *         postId:
 *           type: integer
 *           description: The ID of the post the comment is related to
 *       example:
 *         id: 1
 *         name: "John Doe"
 *         body: "This is an insightful post!"
 *         email: optimus@autobots.com
 *         postId: 1
 */

/**
 * @swagger
 * /autobots:
 *   get:
 *     summary: Retrieve a list of Autobots
 *     tags: [Autobots]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of Autobots to retrieve per page (default is 10)
 *     responses:
 *       200:
 *         description: A list of Autobots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Autobot'
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * /autobots/{autobotId}/posts:
 *   get:
 *     summary: Retrieve a list of posts for a specific Autobot
 *     tags: [Autobots]
 *     parameters:
 *       - in: path
 *         name: autobotId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the Autobot
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of posts to retrieve per page (default is 10)
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: Autobot not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: Retrieve comments for a specific post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the post to retrieve comments for
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of comments to retrieve per page (default is 10)
 *     responses:
 *       200:
 *         description: A list of comments for the specified post
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
