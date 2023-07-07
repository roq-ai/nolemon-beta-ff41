import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { repairOrderValidationSchema } from 'validationSchema/repair-orders';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.repair_order
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getRepairOrderById();
    case 'PUT':
      return updateRepairOrderById();
    case 'DELETE':
      return deleteRepairOrderById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRepairOrderById() {
    const data = await prisma.repair_order.findFirst(convertQueryToPrismaUtil(req.query, 'repair_order'));
    return res.status(200).json(data);
  }

  async function updateRepairOrderById() {
    await repairOrderValidationSchema.validate(req.body);
    const data = await prisma.repair_order.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteRepairOrderById() {
    const data = await prisma.repair_order.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
