const db = require('./db');
const Campus = require('./db/models/campus');
const Student = require('./db/models/student');

const students = [
  {
    name: 'Michael Jordan',
    email: 'some@email.com',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150',
    campusId: 1
  },
  {
    name: 'Evans Something',
    email: 'burger@email.com',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150',
    campusId: 2
  },
  {
    name: 'Puppy Bowl',
    email: 'pizza@email.com',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150',
    campusId: 3
  },
  {
    name: 'Neo Anderson',
    email: 'map@email.com',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150',
    campusId: 4
  },
  {
    name: 'Michael Gordon',
    email: 'john@email.com',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150',
    campusId: 1
  },
  {
    name: 'Eric Something',
    email: 'eric@email.com',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150',
    campusId: 2
  },
  {
    name: 'Raptor Bowl',
    email: 'bowlbowl@email.com',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150',
    campusId: 2
  },
  {
    name: 'Betsy Anderson',
    email: 'btebtes@email.com',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150',
    campusId: 4
  },
  {
    name: 'John Jordan',
    email: 'jjjjjj@email.com',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150',
    campusId: 1
  },
  {
    name: 'Evans Nothing',
    email: 'lame@email.com',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150',
    campusId: 7
  },
  {
    name: 'Cat Bowl',
    email: 'dog@email.com',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150',
    campusId: 6
  },
  {
    name: 'Neo Lakes',
    email: 'theone1337@email.com',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150',
    campusId: 5
  }
];

const campuses = [
  {
    name: 'earth',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150'
  },
  {
    name: 'mars',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150'
  },
  {
    name: 'pluto',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150'
  },
  {
    name: 'mercury',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150'
  },
  {
    name: 'uranus',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150'
  },
  {
    name: 'jupiter',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150'
  },
  {
    name: 'saturn',
    address: '142 wallaby way',
    image: 'http://via.placeholder.com/150x150'
  }
];

const seed = () =>
  Promise.all(campuses.map(campus => Campus.create(campus))).then(() =>
    Promise.all(students.map(student => Student.create(student)))
  );

const main = () => {
  console.log('Syncing db...');
  db
    .sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
