import { Hono } from 'hono';
import type { Store } from '../../types';
import { zValidator } from '../../validator';
import { createStoreSchema } from './requests';
import { getStores, getStoreById, createStore, deleteStore } from './repository';

const storesRouter = new Hono();

storesRouter.get('/', (c) => {
  const stores: Store[] = getStores(c);
  return c.json(stores);
});

storesRouter.get('/:id', (c) => {
  const store = getStoreById(c, c.req.param('id'));
  if (store) {
    return c.json(store);
  } else {
    return c.notFound();
  }
});

storesRouter.post('/', zValidator('json', createStoreSchema), async (c) => {
  const data = c.req.valid('json');
  const newStore = await createStore(c, data);
  return c.json(newStore, 201);
});

storesRouter.delete('/:id', (c) => {
  deleteStore(c, c.req.param('id'));
  c.status(204);
  return c.json('');
});

export default storesRouter;