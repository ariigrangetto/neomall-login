import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRoute from "./routes/userRoutes.js";
import productsRoutes from "./routes/productRoutes.js";
import cartRoute from "./routes/cartRoutes.js";

const app = express();
app.use(cookieParser());
app.use(morgan("dev"));

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", userRoute);
app.use("/products", productsRoutes);
app.use("/cart", cartRoute);

app.use((req, res) => {
  res.status(404).send("<h1> 404 - not found </h1>");
});

const PORT = process.env.PORT;
// connectDB();

app.listen(PORT, () =>
  console.log(`Servidor escuchando en el puerto: http://localhost:${PORT}`)
);
