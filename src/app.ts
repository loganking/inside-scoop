import { Hono } from 'hono';
import usersRoutes from './modules/users/routes';
import storesRoutes from './modules/stores/routes';
import reviewsRoutes from './modules/reviews/routes';

const api = new Hono().basePath('/api');

api.route('/users', usersRoutes);
api.route('/stores', storesRoutes);
api.route('/reviews', reviewsRoutes);

export default api
