import { Request, Response, NextFunction } from "express";

export default function errorHandler (error, req: Request, res: Response, next: NextFunction) {
	if (error.message) {
		return res.status(400).send(error.message);
	}
	return res.sendStatus(500);
}