import GoogleProvider from "next-auth/providers/google";
import { UserModel } from "../model/model";
import connect from "../utils/db";
import { SignInParams } from "../interface";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn(params:SignInParams) {
      const { user, account } = params;
      if (account?.provider == "google") {
        await connect();

        try {
          const existingUser = await UserModel.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new UserModel({
              email: user.email,
              name: user.name,
              image: user.image,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (e) {
          console.log("Error saving user", e);
          return false;
        }
      }
    },
  },
};
