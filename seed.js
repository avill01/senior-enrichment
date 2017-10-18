const db = require('./db');
const Campus = require('./db/models/campus');
const Student = require('./db/models/student');

const students = [
  { name: 'really_random', email: 'some@email.com', campusId: 1 },
  { name: 'generally_speaking', email: 'some@email.com', campusId: 2 },
  { name: 'dogs_of_fullstack', email: 'some@email.com', campusId: 3 },
  { name: 'lunch_planning', email: 'some@email.com', campusId: 4 }
];

const campuses = [
  {
    name: 'Earth',
    image: 'http://via.placeholder.com/150x150'
  },
  {
    name: 'Mars',
    image: 'http://via.placeholder.com/150x150'
  },
  {
    name: 'Pluto',
    image: 'http://via.placeholder.com/150x150'
  },
  {
    name: 'Etc',
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
