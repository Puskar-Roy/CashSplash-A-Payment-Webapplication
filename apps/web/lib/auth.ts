import GoogleProvider from "next-auth/providers/google";
import { UserModel } from "../model/model";
import connect from "../utils/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn(params: { user: any; account: any }) {
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
        }catch(e){
          console.log("Error saving user", e);
          return false;
          
        }
      }
    },
  },
};

// async authorize(credentials: any) {
//   // Do zod validation, OTP validation here
//   const hashedPassword = await bcrypt.hash(credentials.password, 10);
//   const existingUser = await UserModel.findOne({
//     number: credentials.phone,
//   });

//   console.log(existingUser);

//   if (existingUser) {
//     const passwordValidation = await bcrypt.compare(
//       credentials.password,
//       existingUser.password
//     );
//     if (passwordValidation) {
//       return {
//         id: existingUser._id,
//         name: existingUser.name,
//         email: existingUser.email,
//       };
//     }
//     return null;
//   }

//   try {
//     const user = await UserModel.create({
//       email: credentials.email,
//       name: credentials.name,
//       number: credentials.phone,
//       password: hashedPassword,
//     });
//     console.log(user);

//     return {
//       id: user._id,
//       name: user.name,
//       email: user.number,
//     };
//   } catch (e) {
//     console.error(e);
//   }

//   return null;
// },
