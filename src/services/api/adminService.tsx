import {PrismaClient} from '@prisma/client'

const prismaClient = new PrismaClient()

export async function isAdmin(name: string): Promise<boolean> {
    const found = await prismaClient.admins.findFirst({
        where: { name: name },
    })

    return !!found
}