import mongoose from "mongoose";
const Schema = mongoose.Schema;
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
          return /^[\w-]+(?:\.[\w-]+)*@(?:jmangroup\.com)$/.test(value);
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
