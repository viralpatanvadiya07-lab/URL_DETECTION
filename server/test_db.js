const mongoose = require('mongoose');

mongoose.connect('mongodb://viralpatanvadiya07_db_user:9LRahVSFMvJsrVR1@ac-0r0dt2u-shard-00-00.nque3nl.mongodb.net:27017,ac-0r0dt2u-shard-00-01.nque3nl.mongodb.net:27017,ac-0r0dt2u-shard-00-02.nque3nl.mongodb.net:27017/urldetection?ssl=true&replicaSet=atlas-oxkwqc-shard-0&authSource=admin&appName=rohancluster', { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Connected to DB');
    process.exit(0);
  })
  .catch(err => {
    console.log('Error connecting to DB:', err.message);
    process.exit(1);
  });
