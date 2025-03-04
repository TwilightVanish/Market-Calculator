import {PrismaClient} from '@prisma/client'

const prismaClient = new PrismaClient()

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
    if (percentage == 90) {
        await prismaClient.rates.delete({
            where: {
                type: type,
            }
        })
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