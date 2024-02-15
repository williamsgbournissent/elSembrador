import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  celular: { type: Number, required: true },
  direccion: { type: String, required: true },
  departamento: { type: String },
  image: { type: String },
  clienteId: { type: Number, default: 0 },
  role: {
    type: String,
    enum: ["Usuario", "Admin", "Cliente"],
    default: "Usuario",
  },
});

export default models.User || model("User", userSchema);
