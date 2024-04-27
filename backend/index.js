const express = require("express");
const { router } = require("./routes/index.js"); 
const { userRouter } = require("./routes/user.js");
const app = express();
app.use(cors({
    origin:"*",
    methods:["GET","POST"]
}));
app.use(express.json());

app.use("/api/v1",router);
app.use("/api/v1/user",userRouter)

app.listen(3000);
