const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dbConnect = require('./db/dbConnect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./db/UserModel');

dbConnect();
// body parser configuration
app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

app.post('/login', async (request, response) => {
  User.findOne({ email: request.body.email })
  .then((user) => {
    bcrypt.compare(request.body.password, user.password)
    .then((passwordMatch) => {
      if (!passwordMatch) {
        return response.status(400).send({ message: 'Incorrect Password' });
      }

      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id
        },
        'ASFSGDGD.LKSKHDJ.AIUDIYDSU',
        {
          expiresIn: '24h'
        }
      );

      response.status(200).send({
        message: 'Login Successful',
        token: token
      })
    })
    .catch(err => {
      response.status(400).send({ message: 'Incorrect Password', err });
    })
  })
  .catch(err => {
    response.status(404).send({ message: 'User Not Found', err });
  })
})

app.post('/register', async(request, response) => {
  console.log('request.body: ', request.body.password);
  console.log('request.body: ', typeof request.body.password);
  console.log('hashed ', await bcrypt.hash(request.body.password, 10));
  await bcrypt.hash(request.body.password, 10)
  .then((hashedPassword) => {
    const user = new User({
      email: request.body.email,
      password: hashedPassword
    })

    user.save()
    .then((result) => {
      response.status(201).send({ message: 'User created', result });
    })
    .catch((error) => {
      response.status(500).send({ message: 'Error creating user', error });
    })
  })
  .catch((error) => {
    response.status(500).send({ message: 'Error hashing password', error });
  });
});

module.exports = app;
