import { StatusCodes } from "http-status-codes";
import { isTokenValid } from "../utils/jwt";

export const authenticateUser = async (req:any, res:any, next:any) => {
    try {
        const accessToken = req.headers["authorization"]
        console.log("accessToken: ", accessToken);
        
        const bearerToken = accessToken.split(" ")[1]
        if (accessToken) {
            req.user = isTokenValid(bearerToken)
            console.log(req.user,"user")
            return next()
        } else {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ error: "Invalid Token" })
        }
    } catch (error:any) {
        console.log("err", error.message)
        return res.status(StatusCodes.UNAUTHORIZED).json({ error:"Authentication Invalid"})
    }
}