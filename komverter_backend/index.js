const express = require("express");
const cors = require("cors");
const downloadRouter = require("./routes/download");

const app = express();
const PORT = process.env.PORT || 4000;

// cors problem
app.use(cors());

app.use("/download", downloadRouter);

app.listen(PORT, () => {
  console.log(`Server is live at port ${PORT}`);
});