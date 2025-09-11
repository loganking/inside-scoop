import { Hono } from 'hono';
import type { Store } from '../types';
import data from '../data/db.json' assert { type: 'json' };

const storesRouter = new Hono();

const getStores = (): Store[] => {
  return data.stores;
};

storesRouter.get('/', (c) => {
  const stores: Store[] = getStores();
  return c.json(stores);
});

storesRouter.get('/:id', (c) => {
  const stores: Store[] = getStores();
  const store = stores.find((s) => s.id == c.req.param('id'));
  if (store) {
    return c.json(store);
  } else {
    return c.notFound();
  }
});

storesRouter.post('/', async (c) => {
  // @todo: Add validation and actually save the store
  const newStore = await c.req.json<Store>();
  return c.json(newStore, 201);
});

storesRouter.delete('/:id', (c) => {
  // @todo: Actually delete the store
  return c.json('', 204);
});

export default storesRouter;