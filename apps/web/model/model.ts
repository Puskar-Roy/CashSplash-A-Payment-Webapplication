import mongoose, { Schema, Document, Model } from "mongoose";

enum AuthType {
  Google = "Google",
  Github = "Github",
}

enum OnRampStatus {
  Success = "Success",
  Failure = "Failure",
  Processing = "Processing",
}

interface IUser extends Document {
  email?: string;
  name?: string;
  image: string;
  onRampTransactions: mongoose.Types.ObjectId[];
  balances: mongoose.Types.ObjectId[];
}

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, unique: true, sparse: true },
  name: { type: String },
  image: { type: String, unique: true, required: true },
  onRampTransactions: [
    { type: mongoose.Schema.Types.ObjectId, ref: "OnRampTransaction" },
  ],
  balances: [{ type: mongoose.Schema.Types.ObjectId, ref: "Balance" }],
});

interface IMerchant extends Document {
  email: string;
  name?: string;
  auth_type: AuthType;
}

const MerchantSchema: Schema<IMerchant> = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String },
  auth_type: { type: String, enum: AuthType, required: true },
});

interface IOnRampTransaction extends Document {
  status: OnRampStatus;
  token: string;
  provider: string;
  amount: number;
  startTime: Date;
  userId: mongoose.Types.ObjectId;
}

const OnRampTransactionSchema: Schema<IOnRampTransaction> = new Schema({
  status: { type: String, enum: OnRampStatus, required: true },
  token: { type: String, unique: true, required: true },
  provider: { type: String, required: true },
  amount: { type: Number, required: true },
  startTime: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

interface IBalance extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  locked: number;
}

const BalanceSchema: Schema<IBalance> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  amount: { type: Number, required: true },
  locked: { type: Number, required: true },
});

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

const MerchantModel: Model<IMerchant> =
  mongoose.models.Merchant ||
  mongoose.model<IMerchant>("Merchant", MerchantSchema);

const OnRampTransactionModel: Model<IOnRampTransaction> =
  mongoose.models.OnRampTransaction ||
  mongoose.model<IOnRampTransaction>(
    "OnRampTransaction",
    OnRampTransactionSchema
  );
const BalanceModel: Model<IBalance> =
  mongoose.models.Balance || mongoose.model<IBalance>("Balance", BalanceSchema);

export {
  UserModel,
  MerchantModel,
  OnRampTransactionModel,
  BalanceModel,
  AuthType,
  OnRampStatus,
};
