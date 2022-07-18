import jwt from "jsonwebtoken"

export async function generateToken(data: object){
	return jwt.sign(data, process.env.JWT_SECRETKEY);
}
export async function validateToken(token: string) {
	return jwt.verify(token, process.env.JWT_SECRETKEY)
}