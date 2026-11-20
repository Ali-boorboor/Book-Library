import app from "@/app";
import { logger } from "@/utils/logger";

const port = Number(process.env.PORT ?? 8080);

app.listen(port, () => {
  logger(`🚀 Server started successfully on port ${port}`, "Success");
});
