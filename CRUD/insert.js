const { MongoClient } = require("mongodb");
const { url } = require("../url");
const client = new MongoClient(url, { useUnifiedTopology: true });

// The database to use
const dbName = "test";

// .insertOne(document, options)
// .insertMany(documents, options)

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection("users");

    // insertOne
    const userObject = {
      first: "Ali",
      last: "Baba",
    };

    newUserDB = await users_collection.insertOne(userObject);
    console.log(newUserDB);

    // insertMany
    const multipleUsersObject = [
      {
        first: "Ali",
        last: "Baba",
      },
      {
        first: "Josh",
        last: "Baba",
      },
      {
        first: "Pete",
        last: "Smith",
      },
      {
        first: "William",
        last: "Smith",
      },
    ];

    multipleUsersDB = await users_collection.insertMany(multipleUsersObject);
    // Print the cursor/connection object (useful fields: insertedIds, ops)
    console.log(multipleUsersDB);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
