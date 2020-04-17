const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
// USER

router.get('/users', ctrl.users.index);
router.get('/users/:id', ctrl.users.show);
router.post('/users', ctrl.users.create);

router.get('/meditations', ctrl.meditations.index);
router.get('/meditations/:id', ctrl.meditations.show);
router.post('/meditations', ctrl.meditations.create);
router.put('/meditations/:id', ctrl.meditations.update);
router.delete('/meditations/:id', ctrl.meditations.destroy);

// POST

router.get('/posts', ctrl.posts.index);
router.get('/posts/:id', ctrl.posts.show);
router.post('/meditations/:meditationId/posts', ctrl.posts.create);
router.put('/meditations/:meditationId/posts/:postId', ctrl.posts.update);
router.delete('/meditations/:meditationId/posts/:postId', ctrl.posts.destroy);

router.post('/register', ctrl.auth.register);
router.post('/login', ctrl.auth.login);
router.delete('/logout', ctrl.auth.logout);
router.get('/verify', ctrl.auth.verify);

module.exports = router;
