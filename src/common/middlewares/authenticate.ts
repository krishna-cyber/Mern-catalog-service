import { expressjwt, GetVerificationKey } from "express-jwt";
import { Request } from "express";
import config from "config";
import JwksRsa from "jwks-rsa";
import { AuthCookie } from "../types/types";

export default expressjwt({
    secret: JwksRsa.expressJwtSecret({
        jwksUri: config.get("jwks.uri"),
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
    }) as GetVerificationKey,
    algorithms: ["RS256"],
    getToken(req: Request) {
        const authHeader = req.headers.authorization;

        // Bearer eyjllsdjfljlasdjfljlsadjfljlsdf
        if (authHeader && authHeader.split(" ")[1] !== "undefined") {
            const token = authHeader.split(" ")[1];
            if (token) {
                return token;
            }
        }

        const { accessToken } = req.cookies as AuthCookie;
        return accessToken;
    },
});
