'use strict';

const express = require('express');
const router = express.Router();

const {
    signup,
    signin,
    logout,
    findUserById,
    deleteUserById,
    updateUser,
    userProfile
} = require('../controllers/user.controller');

const userValidation = require("../middlewares/validations/user.validation");
const authService = require('../middlewares/auth/auth.service');

/**
 * @swagger
 * /user/signup:
 *   post:
 *     tags:
 *      - User
 *     summary: Create a new user.
 *     description: Create a new user.
 *     requestBody:
 *       required: true
 *       description: Create a new user.
 *       content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * components:
 *   schemas:
 *      ERROR_NOT_FOUND:
 *        type: object
 *        properties:
 *          success:
 *            type: boolean
 *            description: If request was successful true else false
 *            example: false
 *          message:
 *            type: string
 *            description: If resource not true else not found
 *            example: You must provide your credentials (token or user with password) to access the resource
 *      ERROR_FORBIDDEN:
 *        type: object
 *        properties:
 *          success:
 *            type: boolean
 *            description: If request was successful true else false
 *            example: false
 *          message:
 *            type: string
 *            description: If resource not true else not found
 *            example: You are not allow to perform this action on this resource
 *      ERROR_UNAUTHORIZED:
 *        type: object
 *        properties:
 *          success:
 *            type: boolean
 *            description: If request was successful true else false
 *            example: false
 *          message:
 *            type: string
 *            description: If resource not true else not found
 *            example: Resource error
 *      JSON_BODY:
 *        type: object
 *        properties:
 *          success:
 *            type: boolean
 *            description: If request was successful true else false
 *            example: true
 *          message:
 *             type: string
 *             description: If request failed for any reason.
 *             example: You are not allow to perform this action on this resource
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: The users ID is only required in PUT request.
 *            example: 64f4e055eca1567724266c82
 *          firstname:
 *            type: string
 *            description: The user's first name.
 *            example: Ibrahim
 *          lastname:
 *            type: string
 *            description:   The user's last name.
 *            example: Rugova
 *          birthday:
 *            type: string
 *            description: The user's birthday.
 *            example: 02/12/1944
 *          email:
 *            type: string
 *            description: The user's email.
 *            example: ibrahim.rugova@president-ksgov.net
 *          password:
 *            type: string
 *            description: The user's password. Minimum 5 character. Password must contain at least one uppercase character, one lowercase character, one digit, one special character
 *            example: KosovA1!?_
 *          role:
 *            type: integer
 *            description: The user's role. 0 for regular- and 1 admin-user.
 *            example: 1
 *          address:
 *            type: string
 *            description: The user's address.
 *            example: Sheshi “ Nëna Terezë ” p.n 10000 Prishtinë, Kosovë
 *          phone:
 *            type: string
 *            description: The user's phone
 *            example: +383 (038) 200 12 048
 *          createdAt:
 *            type: string
 *            description: When the user was created.
 *            example: 1981-09-03T14:51:47.267Z
 *          update:
 *            type: string
 *            description: The last time that the user was updated.
 *            example: 2006-01-01T14:51:47.267Z
 *
 *
 *
 */
router.post('/signup', [userValidation.validateRequestBody], signup);
/**
 * @swagger
 * /user/signin:
 *   get:
 *     tags:
 *      - User
 *     summary: Get a session token.
 *     description: Get a session token.
 *     responses:
 *       200:
 *         description: Get a session token for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: If request was successful true else false
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: The session token, that is valid 1 hour.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjQ5ZDgzOGQ3ZWE4ZTFmOGMzN2Y2MSIsImlhdCI6MTY5Mzc1MjcyNSwiZXhwIjoxNjkzNzU2MzI1fQ.LZVwRENIFTvogpApVfPlGq8NFkWtJZffpR19-sUpJeY
 *       404:
 *         description: User ID not found.
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ERROR_NOT_FOUND'
 *       401:
 *         description: Unauthorized
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ERROR_UNAUTHORIZED'
 *       403:
 *         description: Forbidden
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ERROR_FORBIDDEN'
 */
router.get('/signin', [authService.isAuthenticated], signin);
/**
 * @swagger
 * /user/profile:
 *   get:
 *     tags:
 *      - User
 *     summary: Get a user.
 *     description: Get a user.
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User ID not found.
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ERROR_NOT_FOUND'
 *       401:
 *         description: Unauthorized
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ERROR_UNAUTHORIZED'
 *       403:
 *         description: Forbidden
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ERROR_FORBIDDEN'
 */
router.get('/profile', [authService.isAuthenticated], userProfile);
/**
 * @swagger
 * /user/byId/{userId}:
 *   put:
 *     tags:
 *      - User
 *     summary: Update a user by ID.
 *     description: Update a user by ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *          type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       description: Update a new user by ID.
 *       content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User ID not found.
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ERROR_NOT_FOUND'
 *       401:
 *         description: Unauthorized
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ERROR_UNAUTHORIZED'
 *       403:
 *         description: Forbidden
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ERROR_FORBIDDEN'
 */
router.put('/byId/:id', [authService.isAuthenticated, userValidation.validateUpdateBody], updateUser);
/**
 * @swagger
 * /user/logout:
 *   get:
 *     tags:
 *      - User
 *     summary: Log out the current user.
 *     description: Log out the current user.
 *     responses:
 *       200:
 *         description: Log out the current user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: If request was successful true else false
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: The session of the user is cleared in the backend.
 *                   example: Logged out
 *       404:
 *         description: User ID not found.
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ERROR_NOT_FOUND'
 *       401:
 *         description: Unauthorized
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ERROR_UNAUTHORIZED'
 *       403:
 *         description: Forbidden
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ERROR_FORBIDDEN'
 */
router.get('/logout', [authService.isAuthenticated], logout);
/**
 * @swagger
 * /user/byId/{userId}:
 *   get:
 *     tags:
 *      - User
 *     summary: Get a user by ID.
 *     description: Get a user by ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *          type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Get a user by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: If request was successful true else false
 *                   example: true
 *                 message:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User ID not found.
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ERROR_NOT_FOUND'
 *       401:
 *         description: Unauthorized
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ERROR_UNAUTHORIZED'
 *       403:
 *         description: Forbidden
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ERROR_FORBIDDEN'
 */
router.get('/byId/:id', [authService.isAuthenticated], findUserById);
/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Everything about your User requests.
 *
 * /user/byId/{userId}:
 *   delete:
 *     tags:
 *        - User
 *     summary: Delete a user by ID.
 *     description: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *          type: string
 *         required: true
 *     responses:
 *       204:
 *         description: Delete a user by ID.
 *       404:
 *         description: User ID not found.
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ERROR_NOT_FOUND'
 *       401:
 *         description: Unauthorized
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ERROR_UNAUTHORIZED'
 *       403:
 *         description: Forbidden
 *         content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/ERROR_FORBIDDEN'
 */
router.delete('/byId/:id', [authService.isAuthenticated], deleteUserById);

// make it available in other files, so the application can use it.
module.exports = router;