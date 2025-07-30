import { config } from "dotenv";


config({
    // eslint-disable-next-line no-undef
    path: `.env.${process.env.NODE_ENV || 'development'}.local`
})


// eslint-disable-next-line no-undef
export const { PORT, JWT_SECRET, JWT_EXPIRES_IN, NODE_ENV, DB_URI } = process.env