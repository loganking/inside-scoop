import { Hono } from 'hono';
import type { Review } from '../../types';
import { getReviews, getReviewById, createReview, deleteReview } from './repository';
import { zValidator } from '../../validator';
import { createReviewSchema } from './requests';

const reviewsRouter = new Hono();

reviewsRouter.get('/', (c) => {
  const reviews: Review[] = getReviews(c);
  return c.json(reviews);
});

reviewsRouter.get('/:id', (c) => {
  const review = getReviewById(c, c.req.param('id'));
  if (review) {
    return c.json(review);
  } else {
    return c.notFound();
  }
});

reviewsRouter.post('/', zValidator('json', createReviewSchema), async (c) => {
  const data = c.req.valid('json');
  const review = await createReview(c, data);
  return c.json(review, 201);
});

reviewsRouter.delete('/:id', (c) => {
  deleteReview(c, c.req.param('id'));
  c.status(204);
  return c.json('');
});

export default reviewsRouter;