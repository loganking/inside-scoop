import { Hono } from 'hono';
import { zValidator } from '../validator';
import type { User } from '../types';
import { createUserSchema } from '../schemas';
import data from '../data/db.json' assert { type: 'json' };


const usersRouter = new Hono();

const getUsers = (): User[] => {
  return data.users;
};

const saveUser = (user: User): User => {
  // @todo: Actually save the user
  const newUser = { ...user, id: Date.now().toString() };
  data.users.push(newUser);
  return newUser;
};

usersRouter.get('/', (c) => {
  const users: User[] = getUsers();
  return c.json(users);
});

usersRouter.get('/:id', (c) => {
  const users: User[] = getUsers();
  const user = users.find((u) => u.id == c.req.param('id'));
  if (user) {
    return c.json(user);
  } else {
    return c.notFound();
  }
});

usersRouter.post('/', zValidator('json', createUserSchema), async (c) => {
  const data = await c.req.valid('json');
  const user = saveUser(data);
  return c.json(data, 201);
  //const newUser = await c.req.json<User>();
  //return c.json(newUser, 201);
});

usersRouter.delete('/:id', (c) => {
  // @todo: Actually delete the user
  return c.json('', 204);
});

export default usersRouter;