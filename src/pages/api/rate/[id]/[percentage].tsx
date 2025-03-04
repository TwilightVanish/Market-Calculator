import {NextApiRequest, NextApiResponse} from "next";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {isAdmin} from "@/services/api/adminService";
import {setRate} from "@/services/api/rateService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
        res.status(401).send("You are not logged in.");
        return;
    }

    const name = session?.user?.name as string;
    if (!await isAdmin(name)) {
        res.status(403).send("You are not an admin.");
        return;
    }

    const id = req.query.id;
    const percentage = req.query.percentage;

    if (typeof id !== "string" || typeof percentage !== "string") {
        res.status(400).send("Invalid parameter.");
        return;
    }

    const parsedId = parseInt(id);
    const parsedPercentage = parseInt(percentage);

    if (isNaN(parsedId) || isNaN(parsedPercentage)) {
        res.status(400).send("Parameter isn't valid number.");
        return;
    }

    await setRate(parsedId, parsedPercentage);
    res.status(200).send("");
}