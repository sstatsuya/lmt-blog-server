const express = require("express"); // import thư viện express đã cài ở trên
const cors = require('cors');

async function startServer() {
  //Start REST
  const app = express();
  app.use(express.json());
  // fix cors nek
  app.use(cors())
  app.use("/", require("./route"));
  

  const PORT = process.env.PORT || 3001;
  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}`
  );
}
startServer();
