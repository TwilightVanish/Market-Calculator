import {NextApiRequest, NextApiResponse} from "next";
import {isAdmin} from "@/services/api/adminService";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
        res.status(200).json(false);
        return;
    }

    const name = session?.user?.name as string;
    res.status(200).json(await isAdmin(name));
}