const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('views/index.html', {
    root: __dirname + '/../'
  });
});


router.get('/meditations', (req, res) => {
  res.sendFile('views/meditation/meditation.html', {
    root: __dirname + '/../',
  });
});
router.get('/meditations/:id', (req, res) => {
  res.sendFile('views/meditation/meditationShow.html', {
    root: __dirname + '/../'
  });
});

router.get('/register', (req, res) => {
  res.sendFile('views/auth/register.html', {
    root: __dirname + '/../'
  });
});


router.get('/login', (req, res) => {
  res.sendFile('views/auth/login.html', {
    root: __dirname + '/../'
  });
});

router.get('/profile', (req, res) => {
  res.sendFile('views/profile/profile.html', {
    root: __dirname + '/../'
  });
});


module.exports = router;
