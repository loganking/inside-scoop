import { Hono } from 'hono';
import { zValidator } from '../../validator';
import type { User } from '../../types';
import { createUserSchema } from './requests';
import { getUsers, getUserById, createUser, deleteUser } from './repository';

const usersRouter = new Hono();

usersRouter.get('/', (c) => {
  const users: User[] = getUsers(c);
  return c.json(users);
});

usersRouter.get('/:id', (c) => {
  const user = getUserById(c, c.req.param('id'));
  if (user) {
    return c.json(user);
  } else {
    return c.notFound();
  }
});

usersRouter.post('/', zValidator('json', createUserSchema), async (c) => {
  const data = c.req.valid('json');
  const user = await createUser(c, data);
  return c.json(user, 201);
});

usersRouter.delete('/:id', (c) => {
  deleteUser(c, c.req.param('id'));
  c.status(204);
  return c.json('');
});

export default usersRouter;