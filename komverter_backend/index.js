const express = require("express");
const cors = require("cors");
const downloadRouter = require("./routes/download");

const app = express();
const PORT = process.env.PORT || 4000;

// cors problem
const corsOptions = {
  origin: 'https://komverter.vercel.app/',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}


// F
app.use(cors(corsOptions));

app.use("/download", downloadRouter);

app.listen(PORT, () => {
  console.log(`Server is live at port ${PORT}`);
});