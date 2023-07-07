import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { technicianValidationSchema } from 'validationSchema/technicians';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getTechnicians();
    case 'POST':
      return createTechnician();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTechnicians() {
    const data = await prisma.technician
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'technician'));
    return res.status(200).json(data);
  }

  async function createTechnician() {
    await technicianValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.repair_order?.length > 0) {
      const create_repair_order = body.repair_order;
      body.repair_order = {
        create: create_repair_order,
      };
    } else {
      delete body.repair_order;
    }
    const data = await prisma.technician.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
