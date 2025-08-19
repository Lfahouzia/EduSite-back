import app from "./app";
import { config } from "./environnement/env.config";


const port = config.port;

app.listen(port, () => {
  console.log(`Server is running on port   http://localhost:${port}`);
});
