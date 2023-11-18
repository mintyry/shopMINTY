const express = require('express');
const routes = require('./routes');
// imported sequelize connection
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

//handles json accordingly
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//uses routes in this folder
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
