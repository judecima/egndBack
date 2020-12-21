import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import pkg from '../package.json';
import ProductsRoute from './routes/products.routes';
import UsersRoute from './routes/users.route';
import AuthRoute from './routes/auth.route';
import { createRole } from './libs/confInicial';
const app = express();
createRole();
app.set('pkg', pkg);
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json({
		autor: pkg.author,
		proyecto: pkg.name,
		version: pkg.version,
	});
});

app.use('/api/products', ProductsRoute);
app.use('/api/auth', AuthRoute);
app.use('/api/user', UsersRoute);

export default app;
