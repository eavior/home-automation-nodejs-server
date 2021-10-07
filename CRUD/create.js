const { MongoClient } = require("mongodb");
const { url } = require("../url");
const client = new MongoClient(url, { useUnifiedTopology: true });

// The database to use
const dbName = "test";

// Each entry in a MongoDB collection is called a document. A document is a JSON-like object called a BSON. The BSON format generally looks and acts like JSON.
// One difference, however, is that BSON objects can store more data types than JSON. For instance, in a MongoDB document, you can store other documents and arrays of other documents.

async function run() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection "people"
    const col = db.collection("people");

    // Construct a document
    let personDocument = {
      name: { first: "Ali", last: "Baba" },
      birth: new Date(1935, 2, 23),
      death: new Date(2021, 5, 7),
      contribs: ["Ali Contribution", "Ali House", "Alibaba"],
      views: 1250000,
    };

    // To access the last field in the embedded document, use dot notation like so name.last.
    // Similar to embedded documents, for arrays use dot notation to access values. For instance, to access the third item in the array stored in the contribs field above, you write "contribs.2" because the third item is in the 2 index position.

    // Insert a single document, wait for promise so we can read it back
    const p = await col.insertOne(personDocument);
    // You get a 'Cursor object' back. To retrieve only the document, use a .forEach loop or retrieve the latest document added by using findOne().
    console.log(p);
    // Find one document
    const myDoc = await col.findOne();
    // Print to the console
    console.log(myDoc);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
