import jwt from "jsonwebtoken";

type UserPayload ={
    id: string
    // name: string
    // email: string
}

export const generarJWT = (payload : UserPayload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "90d"
    });
}