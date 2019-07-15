const express = require('express');
const router = require('express-imp-router');
const path = require('path');

const app = express();
router(app);

router.route([
  {
    controllers: `${path.resolve('.')}/src/controllers`,
    middlewares: `${path.resolve('.')}/src/middlewares`,
    routes: {
      '/api': {
        [router.IMP.MIDDLEWARE]: {
          controllers: ['express#bodyParser'],
          inheritance: router.MIDDLEWARE.INHERITANCE.DESC,
        },
        '/posts': {
          post: 'PostController#post'
        }
      }
    },
  }
]);

app.listen(8080);