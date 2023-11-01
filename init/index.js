const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../model/listing");

const MONGODB_URL =
  "mongodb+srv://admin:wanderLust@cluster0.rjxok2x.mongodb.net/";

async function main() {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}

main();

const initDB = async () => {
  try {
    await Listing.deleteMany({}).maxTimeMS(60000); // Set to 60 seconds
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "654239661356f4a65971ea87",
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};

initDB();
