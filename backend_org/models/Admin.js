import mongoose from "mongoose";
import dotenv from 'dotenv'
const Schema = mongoose.Schema;
dotenv.config()
const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      validate: {
        validator: function (value) {
          // Check if the email ends with jmangroup.com
          // Construct the regular expression dynamically
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
  },
  {
    collection: "admins",
  }
);
export default mongoose.model("Admins", adminSchema);
