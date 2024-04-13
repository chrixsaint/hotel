const express = require('express');
const bodyParser = require('body-parser');


const userRoute = require("./routes/userrout");
const propertyRoute = require("./routes/propertyroute");
const bookingRoute = require("./routes/bookingroute");
const userReviewRoute = require("./routes/userreviewroute");
const locationRoute = require("./routes/locationroute");
const attributeRoute = require("./routes/attributeroute");
// Create an Express application instance
const app = express();

app.use(bodyParser.json());

// Mount the Routes middleware on the "/" paths

app.use("/users", userRoute);
app.use("/properties", propertyRoute);
app.use("/bookings", bookingRoute);
app.use("/userReview", userReviewRoute);
app.use("/locations", locationRoute);
app.use("/attributes", attributeRoute);

module.exports = app;
