import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import leaveRoutes from "./routes/leave.routes.js";
import employeeRoutes from "./routes/employee.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import setupSwagger from "./config/swagger.js";

import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// app.use(helmet());

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.use("/api/leaves", leaveRoutes);

app.use("/api/employees", employeeRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use(errorMiddleware);

setupSwagger(app);

export default app;