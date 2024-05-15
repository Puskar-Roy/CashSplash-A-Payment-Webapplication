import { Profile } from "next-auth";

interface UserInterface {
  id: string;
  name: string;
  email: string;
  image: string;
}
interface AuthData {
  provider: string;
  type: string;
  providerAccountId: string;
  access_token: string;
  expires_at: number;
  scope: string;
  token_type: string;
  id_token: string;
}

export interface SignInParams {
  user: UserInterface;
  account: AuthData;
  profile?: Profile;
  email?: { verificationRequest?: boolean };
  credentials?: Record<string, unknown>;
}
