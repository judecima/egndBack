import 'babel-polyfill';
import app from './app';
import './database';
app.listen(3000);

console.log('server listen on port', 3000);
