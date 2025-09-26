import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleScheduleDemo,
  handleContactUs,
  handleApplyJob,
} from "./routes/sendmail";
import multer from "multer";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Mail routes
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 6 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const allowed = ["application/pdf", "application/msword"];
      if (allowed.includes(file.mimetype)) cb(null, true);
      else
        cb(new Error("Unsupported file type. Only PDF and DOC are allowed."));
    },
  });

  app.post("/api/sendmail/schedule", handleScheduleDemo);
  app.post("/api/sendmail/contact", handleContactUs);
  app.post("/api/sendmail/apply-job", upload.single("resume"), handleApplyJob);

  return app;
}
