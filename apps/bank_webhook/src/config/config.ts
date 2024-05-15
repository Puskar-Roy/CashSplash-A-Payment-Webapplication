import dotenv from 'dotenv'

dotenv.config();

export const config = {
  MONGOURI: process.env.MONGOURI || "",
};