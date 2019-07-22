require('dotenv').config();
const express = require('express');
const router = require('express-imp-router');
const path = require('path');

const app = express();
router(app);
if(process.env.DEBUG) {
  router.enableDebug();
}

router.route([
  {
    controllers: `${path.resolve('.')}/src/controllers`,
    middlewares: `${path.resolve('.')}/src/middlewares`,
    routes: {
      '/api': {
        [router.IMP.MIDDLEWARE]: {
          controllers: ['express#bodyParser', 'providers#get'],
          inheritance: router.MIDDLEWARE.INHERITANCE.DESC,
        },
        '/posts': {
          post: 'PostController#post'
        },
        '/config': {
          get: 'ConfigController#getAll'
        }
      }
    },
  }
]);

app.listen(8080);