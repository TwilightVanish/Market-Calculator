import {Prisma, PrismaClient} from '@prisma/client'

const prismaClient = new PrismaClient()
const DEFAULT_RATE = Number(process.env.DEFAULT_RATE) || 90;

export async function getRates(types: number[]): Promise<{ type: number, percentage: number }[]> {
    return prismaClient.rates.findMany({
        where: {
            type: {
                in: types
            }
        },
    });
}

export async function setRate(type: number, percentage: number): Promise<void> {
    if (percentage === DEFAULT_RATE) {
        try {
            await prismaClient.rates.delete({
                where: { type: type },
            });
        } catch (error: unknown) {
            if (!(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')) {
                throw error;
            }
        }
        return;
    }

    await prismaClient.rates.upsert({
        where: {type: type},
        update: {
            percentage: percentage,
        },
        create: {
            type: type,
            percentage: percentage,
        }
    });
}