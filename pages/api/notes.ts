import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { title, content } = req.body;
    const result = await prisma.note.create({
      data: {
        title,
        content,
      },
    });
    res.json(result);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    console.log(id);
    const result = await prisma.note.delete({
      where: {
        id: id,
      },
    });
    res.json(result)
  } else {
    res.status(404)
  }
};
