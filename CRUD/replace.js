const { MongoClient, ObjectID } = require("mongodb");
const { url } = require("../url");
const client = new MongoClient(url, { useUnifiedTopology: true });

// The database to use
const dbName = "test";

// .replaceOne(filter, replacement, options)

async function runReplaceOne() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection("users");

    replacement_doc = {
      middle: "Ali",
      country: "France",
    };

    replaced_user = await users_collection.replaceOne(
      { first: "Ali" },
      replacement_doc
    );
    console.log(replaced_user);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

runReplaceOne().catch(console.dir);
