import express from 'express';

import { engine } from 'express-handlebars';
import { router } from './router.mjs';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.engine('.hbs', engine({ extname: '.hbs' }));
app.use('/', router);
app.set('view engine', '.hbs');
app.use((req, res) => {
  res.redirect('/books');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server listening at  port: ' + PORT));
