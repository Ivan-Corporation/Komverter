const express = require("express");
const cors = require("cors");
const downloadRouter = require("./routes/download");

const app = express();
const PORT = process.env.PORT || 4000;



// F
app.use(cors());

app.use("/download", downloadRouter);

app.listen(PORT, () => {
  console.log(`Server is live at port ${PORT}`);
});