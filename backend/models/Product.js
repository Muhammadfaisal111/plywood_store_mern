import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },

    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // kis user ne product add kiya
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
