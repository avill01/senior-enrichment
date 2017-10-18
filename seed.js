const db = require('./db');
const Campus = require('./db/models/campus');
const Student = require('./db/models/student');

const students = [
  {
    name: 'Michael Jordan',
    email: 'some@email.com',
    address: '142 wallaby way',
    profile: 'http://via.placeholder.com/150x150',
    campusId: 1
  },
  {
    name: 'Evans Something',
    email: 'some@email.com',
    address: '142 wallaby way',
    profile: 'http://via.placeholder.com/150x150',
    campusId: 2
  },
  {
    name: 'Puppy Bowl',
    email: 'some@email.com',
    address: '142 wallaby way',
    profile: 'http://via.placeholder.com/150x150',
    campusId: 3
  },
  {
    name: 'Neo Anderson',
    email: 'some@email.com',
    address: '142 wallaby way',
    profile: 'http://via.placeholder.com/150x150',
    campusId: 4
  },
  {
    name: 'Michael Gordon',
    email: 'some@email.com',
    address: '142 wallaby way',
    profile: 'http://via.placeholder.com/150x150',
    campusId: 1
  },
  {
    name: 'Eric Something',
    email: 'some@email.com',
    address: '142 wallaby way',
    profile: 'http://via.placeholder.com/150x150',
    campusId: 2
  },
  {
    name: 'Raptor Bowl',
    email: 'some@email.com',
    address: '142 wallaby way',
    profile: 'http://via.placeholder.com/150x150',
    campusId: 2
  },
  {
    name: 'Betsy Anderson',
    email: 'some@email.com',
    address: '142 wallaby way',
    profile: 'http://via.placeholder.com/150x150',
    campusId: 4
  },
  {
    name: 'John Jordan',
    email: 'some@email.com',
    address: '142 wallaby way',
    profile: 'http://via.placeholder.com/150x150',
    campusId: 1
  },
  {
    name: 'Evans Nothing',
    email: 'some@email.com',
    address: '142 wallaby way',
    profile: 'http://via.placeholder.com/150x150',
    campusId: 7
  },
  {
    name: 'Cat Bowl',
    email: 'some@email.com',
    address: '142 wallaby way',
    profile: 'http://via.placeholder.com/150x150',
    campusId: 6
  },
  {
    name: 'Neo Lakes',
    email: 'some@email.com',
    address: '142 wallaby way',
    profile: 'http://via.placeholder.com/150x150',
    campusId: 5
  }
];

const campuses = [
  {
    name: 'earth',
    image: 'http://via.placeholder.com/150x150'
  },
  {
    name: 'mars',
    image: 'http://via.placeholder.com/150x150'
  },
  {
    name: 'pluto',
    image: 'http://via.placeholder.com/150x150'
  },
  {
    name: 'mercury',
    image: 'http://via.placeholder.com/150x150'
  },
  {
    name: 'uranus',
    image: 'http://via.placeholder.com/150x150'
  },
  {
    name: 'mercury',
    image: 'http://via.placeholder.com/150x150'
  },
  {
    name: 'saturn',
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
