// YouTube MP3 download and converter API
const express = require("express");
const cors = require("cors");
const downloadRouter = require("./routes/download");

const app = express();
const PORT = process.env.PORT;
// const PORT = process.env.PORT || 4000;






app.use("/download", downloadRouter);

// F
app.use(cors());


app.listen(PORT, () => {
  console.log(`Server is live at port ${PORT}`);
});
