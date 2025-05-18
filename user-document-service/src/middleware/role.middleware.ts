import { Request, Response, NextFunction } from "express";

export const requireRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const role = req.user?.role;
        if (!role || !roles.includes(role)) {
            return res.status(403).json({ error: "Forbidden: insufficient role" });
        }
        next();
    };
};

