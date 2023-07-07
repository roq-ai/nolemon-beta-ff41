import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { technicianValidationSchema } from 'validationSchema/technicians';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.technician
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTechnicianById();
    case 'PUT':
      return updateTechnicianById();
    case 'DELETE':
      return deleteTechnicianById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTechnicianById() {
    const data = await prisma.technician.findFirst(convertQueryToPrismaUtil(req.query, 'technician'));
    return res.status(200).json(data);
  }

  async function updateTechnicianById() {
    await technicianValidationSchema.validate(req.body);
    const data = await prisma.technician.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTechnicianById() {
    const data = await prisma.technician.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
