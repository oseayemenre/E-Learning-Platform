import { app } from "./index";
import { PORT } from "./secret";
import http from "http";

export const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is alive on http://localhost:${PORT}`);
});
