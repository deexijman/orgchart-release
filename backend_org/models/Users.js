import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,

    name: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      validate: {
        validator: function (value) {
          // Check if the email ends with jmangroup.com
          const regex = new RegExp(`^[\\w-]+(?:\\.[\\w-]+)*@${process.env.COMPANY_NAME}\\.${process.env.COMPANY_DOMAIN}$`);

          // Test the value against the regular expression
          return regex.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid jmangroup.com email address!`,
      },
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    reportsTo: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Users",
    timestamps: true,
  }
);
export default mongoose.model("Users", userSchema);
