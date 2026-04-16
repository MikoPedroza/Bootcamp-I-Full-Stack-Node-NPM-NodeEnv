const express = require("express"); // acts as a function
const app = express(); // creates app object
const port = 3001; // 0 - 65,535 / http://localhost:3001

app.get("/users/:role", (req, res) => {
    console.log("Request Method: ", req.method);
    console.log("Request Params: ", req.params);

    res.send("Hello World");
})
app.get("/tasks/:users?", (req, res) => { // optional parameter
    console.log("Request Method: ", req.method);
    console.log("Request URL: ", req.url);
    console.log("Request Params: ", req.params);

    res.send("Hello World");
})
app.get("/error/*", (req, res) => { // any parameter
    console.log("Request Method: ", req.method);
    console.log("Request URL: ", req.url);
    console.log("Request Params: ", req.params);

    res.send("Hello World");
})
app.get(/.*fly$/, (req, res) => { // regular expression, can have any prefix
    console.log("Request Method: ", req.method);
    console.log("Request URL: ", req.url);
    console.log("Request Params: ", req.params);

    res.send("Hello World");
})


app.get("/posts?", (req, res) => { // optional letter
    console.log("Request Method: ", req.method);
    console.log("Request URL: ", req.url);
    console.log("Request Params: ", req.params);

    res.send("Hello World");
})
app.get("/tag*", (req, res) => { // wild card characters (catch all)
    console.log("Request Method: ", req.method);
    console.log("Request URL: ", req.url);
    console.log("Request Params: ", req.params);

    res.send("Hello World");
})

app.post("/", (req, res) => {
    console.log("Request Method: ", req.method); 

    res.send("Hello World");
})

app.patch("/", (req, res) => {
    console.log("Request Method: ", req.method); 

    res.send("Hello World");
})
app.delete("/", (req, res) => {
    console.log("Request Method: ", req.method); 

    res.send("Hello World");
})
app.put("/", (req, res) => {
    console.log("Request Method: ", req.method); 

    res.send("Hello World");
})



app.listen(port, ()=>{
    console.log(`App listening on port no: ${port}`);
}); // listen to the port



