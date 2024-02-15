import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
  menu: { type: Schema.Types.ObjectId, ref: "Menu", required: true },
  menuId: { type: Number, required: true },
  cliente: { type: Schema.Types.ObjectId, ref: "User", required: true },
  clienteId: { type: Number, required: true },
  comentario: { type: String },
});

export default models.Order || model("Order", orderSchema);
