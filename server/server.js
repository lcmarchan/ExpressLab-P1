const express = require("express");
const app = express();
const port = 5000;

const cartRoutes = require("./routes/cart.routes");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/", cartRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
