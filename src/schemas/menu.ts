import { Schema, model, models } from "mongoose";

const menuSchema = new Schema({
  idMenu: { type: Number, unique: true },
  fecha: { type: String, required: true },
  opcion: { type: String, required: true },
  tipo: { type: String },
  // pedidos: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

export default models.Menu || model("Menu", menuSchema);
