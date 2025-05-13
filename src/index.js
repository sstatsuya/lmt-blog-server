const express = require("express"); // import thư viện express đã cài ở trên
const cors = require('cors');


const database = require("./config/database");
database.connect();

async function startServer() {
  //Start REST
  const app = express();
  app.use(express.json());
  app.use("/", require("./route"));
  app.use(cors)
  

  const PORT = process.env.PORT || 3000;
  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}`
  );
}
startServer();
