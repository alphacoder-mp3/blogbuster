import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { decode, sign, verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '@blazedglimmer/common';

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use('/*', async (c, next) => {
  const header = c.req.header('authorization') || '';

  try {
    const token = header?.split(' ')[1];

    const user = await verify(token || header, c.env.JWT_SECRET);

    if (user.id) {
      c.set('userId', user.id);
      await next();
    } else {
      c.status(403);
      return c.json({ error: 'unauthorized' });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      message: 'You are not logged in! Please login.',
    });
  }
});

blogRouter.post('/', async c => {
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ error: 'Incorrect inputs' });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const authorId = c.get('userId');

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
    },
  });
  return c.json({
    id: blog.id,
  });
});

blogRouter.put('/', async c => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ error: 'Incorrect inputs' });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where: { id: body.id },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json({
    id: blog.id,
  });
});

blogRouter.get('/bulk', async c => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.post.findMany();
  return c.json({
    blogs,
  });
});

blogRouter.get('/:id', async c => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param('id');
  try {
    const blog = await prisma.post.findFirst({
      where: { id: id },
    });
    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: 'Error while fetching blog post',
    });
  }
});
