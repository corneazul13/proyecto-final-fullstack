// -------------------------------
// IMPORTS Y CONFIGURACIÓN
// -------------------------------
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// -------------------------------
// CONEXIÓN A MONGODB
// -------------------------------
mongoose.connect("mongodb://127.0.0.1:27017/tercerentrega")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));

// -------------------------------
// MODELO DE USUARIO
// -------------------------------
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model("User", userSchema);

// -------------------------------
// RUTA DE REGISTRO
// -------------------------------
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("📩 Registro recibido:", name, email);

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    return res.json({
      message: "Usuario registrado correctamente",
      user: { name: newUser.name, email: newUser.email }
    });
  } catch (error) {
    console.error("💥 Error en /register:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
});

// -------------------------------
// RUTA DE LOGIN
// -------------------------------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔐 Login recibido:", email, password);

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    res.json({
      message: "Inicio de sesión correcto",
      user: { name: user.name, email: user.email }
    });
  } catch (error) {
    console.error("💥 Error en /login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// -------------------------------
// INICIO DEL SERVIDOR
// -------------------------------
app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://127.0.0.1:3000");
});
