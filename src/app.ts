import { Hono } from 'hono';
import usersRoutes from './routes/users';
import storesRoutes from './routes/stores';
import reviewsRoutes from './routes/reviews';

const api = new Hono().basePath('/api');

api.route('/users', usersRoutes);
api.route('/stores', storesRoutes);
api.route('/reviews', reviewsRoutes);

export default api
