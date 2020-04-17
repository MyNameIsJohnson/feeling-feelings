const db = require('./models');

const users = [
  {
    firstName: 'Jonn',
    lastName: 'Doe',
    email: 'jdoe@gmail.com',
    password: '1234'
  },
  {
    firstName: 'Kevin',
    lastName: 'Smith',
    email: 'ksmith@gmail.com',
    password: '1234'
  },
  {
    firstName: 'Jonn',
    lastName: 'Doe',
    email: 'jdoe@gmail.com',
    password: '1234'
  },
];

const meditations = [
  {
    name: 'Mindfulness',
    description: 'Taking the path of greater awareness can lighten your life',
    image: 'https://tricycle.org/wp-content/uploads/2018/03/meditation-chogyam-trungpa.jpg '
  },
  {

    name: 'Breathing Techniques',
    description: 'Four of the most impact life changing breathing styles!',
    image: 'https://thumbs.dreamstime.com/b/yoga-body-pose-silhouette-over-moon-night-sly-mindfulness-meditation-exercise-prayer-position-yoga-body-pose-silhouette-over-113141516.jpg'
  },
  {

    name: 'Deep Relaxation',
    description: 'Meditations that help you body fall into deep relaxation',
    image: 'https://i.ytimg.com/vi/jeGT1VXwfx4/maxresdefault.jpg'
  },
  {

    name: 'Destressing',
    description: 'Life is stressful, we all know. Meditation has the capabilities of removing the stress out of your life',
    image: 'https://media.npr.org/assets/img/2014/01/07/mindfulness_wide-b20c3525971d5796eba9ad993463fffe8faf2bcb-s800-c85.jpg'
  },
];

const posts = [
  {
    title: 'Post One',
    body: 'This is the body for Post One.'
  },
  {
    title: 'Post Two',
    body: 'This is the body for Post Two.'
  },
  {
    title: 'Post Three',
    body: 'This is the body for Post Three.'
  },
  {
    title: 'Post Four',
    body: 'This is the body for Post Four.'
  },
];
console.log('Deleting all Meditation...');

db.Meditation.deleteMany({}, (err, result) => {
  if (err) {
    console.log(err);
    process.exit();
  }

  console.log('Deleting all posts...');

  db.Post.deleteMany({}, (err, result) => {
    if (err) {
      console.log(err);
      process.exit();
    }

    console.log(`Successfully deleted ${result.deletedCount} posts.`);

    // Delete All Users
    console.log('Deleting all users...');

    db.User.deleteMany({}, (err, result) => {
      if (err) {
        console.log(err);
        process.exit();
      }

      console.log(`Successfully deleted ${result.deletedCount} users.`);

      console.log('Creating new meditations...');
      db.Meditation.create(meditations, (err, newMeditations) => {
        if (err) {
          console.log(err);
          process.exit();
        }

        console.log(`Successfully created ${newMeditations.length} meditations.`);

        // Create New Users
        console.log('Creating new users...');
        db.User.create(users, (err, newUsers) => {
          if (err) {
            console.log(err);
            process.exit();
          }

          console.log(`Successfully created ${newUsers.length} users.`);

          process.exit();
        });
      });
    });
  });
});

