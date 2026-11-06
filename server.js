import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  if (date){
    const date_value = isNaN(date) ? date : Number(date)
    const d = new Date(date_value);
    const isValid = d.toUTCString() !== "Invalid Date" && !isNaN(Date.parse(d))
  
    if (!isValid){
      return res.status(400).json({
        error: "Invalid date"
      })
    }
  
    res.json({
      unix: Date.parse(d),
      utc: d.toUTCString()
    })
  } else {
    const d = new Date();
    res.json({
      unix: Date.now(),
      utc: d.toUTCString()
    })
  }
})
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
