// YouTube MP3 download and converter API
const express = require("express");
const cors = require("cors");
const downloadRouter = require("./routes/download");

const app = express();
// const PORT = process.env.PORT;
const PORT = process.env.PORT || 4000;





// F
app.use(cors())


// check official library code
// app.get(`/download/:${downloadRouter}`, function (req, res, next) {
//   res.json({ msg: 'This is CORS-enabled for all origins!' })
// })


app.use("/download", downloadRouter);




app.listen(PORT, () => {
  console.log(`Server is live at port ${PORT}`);
});
