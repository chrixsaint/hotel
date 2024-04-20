const express = require('express');
const bodyParser = require('body-parser');

// Import routes
const userRoute = require("./routes/userrout");
const propertyRoute = require("./routes/propertyroute");
const bookingRoute = require("./routes/bookingroute");
const userReviewRoute = require("./routes/userreviewroute");
const locationRoute = require("./routes/locationroute");
const attributeRoute = require("./routes/attributeroute");
const userphoneRoutes = require('./routes/userphone');

// Create an Express application instance
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Mount routes
app.use("/users", userRoute);
app.use("/properties", propertyRoute);
app.use("/bookings", bookingRoute);
app.use("/userReview", userReviewRoute);
app.use("/locations", locationRoute);
app.use("/attributes", attributeRoute);
app.use("/", userphoneRoutes); // Add route for handling signup with phone number

module.exports = app;
