// to use express object or app and launch my server and use the app instance (app.)
import express from "express";
const app = express();
const port = 3000;

//to find the folder path of index.html & secret.html
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// to use req.body property
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));
// launching my server
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
// to send the index.html file to the home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
//creating my custom middle ware that make the server to run the post handler if the password matchs & if not it again send the home page html file
function passwordChecker(req, res, next) {
  const input = req.body["password"];
  if (input === "ILoveProgramming") {
    next();
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
}
// make the express object to use my custom middleware
app.use(passwordChecker);
// to send the secret.html file to the post request url
app.post("/check", (req, res) => {
  res.sendFile(__dirname + "/public/secret.html");
});
