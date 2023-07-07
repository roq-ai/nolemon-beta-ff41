import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { shopValidationSchema } from 'validationSchema/shops';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getShops();
    case 'POST':
      return createShop();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getShops() {
    const data = await prisma.shop
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'shop'));
    return res.status(200).json(data);
  }

  async function createShop() {
    await shopValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.appointment?.length > 0) {
      const create_appointment = body.appointment;
      body.appointment = {
        create: create_appointment,
      };
    } else {
      delete body.appointment;
    }
    if (body?.customer?.length > 0) {
      const create_customer = body.customer;
      body.customer = {
        create: create_customer,
      };
    } else {
      delete body.customer;
    }
    if (body?.invoice?.length > 0) {
      const create_invoice = body.invoice;
      body.invoice = {
        create: create_invoice,
      };
    } else {
      delete body.invoice;
    }
    if (body?.repair_order?.length > 0) {
      const create_repair_order = body.repair_order;
      body.repair_order = {
        create: create_repair_order,
      };
    } else {
      delete body.repair_order;
    }
    const data = await prisma.shop.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
