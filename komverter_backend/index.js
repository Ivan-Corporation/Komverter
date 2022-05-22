// YouTube MP3 download and converter API
const express = require("express");
const cors = require("cors");
const downloadRouter = require("./routes/download");

const app = express();
const PORT = process.env.PORT;
// const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: ['https://komverter.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  })
);



app.use("/download", downloadRouter);

app.listen(PORT, () => {
  console.log(`Server is live at port ${PORT}`);
});
