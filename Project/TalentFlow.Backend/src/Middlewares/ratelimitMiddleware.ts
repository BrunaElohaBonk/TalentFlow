import rateLimit from "express-rate-limit";
export const loginRateLimit = rateLimit({

    windowMs: 15 * 60 * 1000, // 15 minutos

    max: 200, // máximo 5 tentativas

    message: {

        success: false,

        message:
            "Muitas tentativas de login. Tente novamente mais tarde."

    },

    standardHeaders: true,

    legacyHeaders: false

});