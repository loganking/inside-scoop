import { Hono } from 'hono';
import type { Review } from '../types';
import data from '../data/db.json' assert { type: 'json' };

const reviewsRouter = new Hono();

const getReviews = (): Review[] => {
  return data.reviews;
};

reviewsRouter.get('/', (c) => {
  const reviews: Review[] = getReviews();
  return c.json(reviews);
});

reviewsRouter.get('/:id', (c) => {
  const reviews: Review[] = getReviews();
  const review = reviews.find((r) => r.id == c.req.param('id'));
  if (review) {
    return c.json(review);
  } else {
    return c.notFound();
  }
});

reviewsRouter.post('/', async (c) => {
  // @todo: Add validation and actually save the review
  const newReview = await c.req.json<Review>();
  return c.json(newReview, 201);
});

reviewsRouter.delete('/:id', (c) => {
  // @todo: Actually delete the review
  return c.json('', 204);
});

export default reviewsRouter;