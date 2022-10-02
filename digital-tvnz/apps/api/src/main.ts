/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import request = require('request');

const app = express();
import cors = require('cors');
app.use(cors());
app.get('/api', (req, res) => {
  console.log('request...', req.query.level),
    request(
      
      function (error, body) {
        res.json(body);
      }
    );
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
