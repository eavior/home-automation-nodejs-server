const { MongoClient, ObjectID } = require("mongodb");
const { url } = require("../url");
const client = new MongoClient(url, { useUnifiedTopology: true });

// The database to use
const dbName = "test";

// .updateOne(filter, update, options)
// .updateMany(filter, update, options)

/* Update:

Name	          Description
$currentDate	  Sets the value of a field to current date, either as a Date or a Timestamp.
$inc	          Increments the value of the field by the specified amount.
$min	          Only updates the field if the specified value is less than the existing field value.
$max	          Only updates the field if the specified value is greater than the existing field value.
$mul	          Multiplies the value of the field by the specified amount.
$rename	        Renames a field.
$set	          Sets the value of a field in a document.
$setOnInsert	  Sets the value of a field if an update results in an insert of a document. Has no effect on update operations that modify existing documents.
$unset	        Removes the specified field from a document.

*/

async function runUpdateOne() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection("users");

    updated_user = await users_collection.updateOne(
      {
        _id: ObjectID("5fa406ec3f4b71a70ae05dab"),
      },
      { $set: { first: "enaJ" } }
    );
    console.log(updated_user);

    one_db_user = await users_collection.findOne({
      _id: ObjectID("5fa406ec3f4b71a70ae05dab"),
    });
    console.log(one_db_user);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

runUpdateOne().catch(console.dir);

async function runUpdateMany() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection("users");

    updated_users = await users_collection.updateMany(
      {
        last: "Baba",
      },
      { $set: { first: "Ali" } }
    );
    console.log(updated_users);

    /*
    After console logging the returned object, the example then uses the .find() method to get all the documents from the collection so that you can console log them and see that the updates did in fact occur. 
    Remember that .find() returns a cursor, which is a collection of documents. You therefore need to loop through it to console log each individual document in the returned collection.
    */

    all_db_users = await users_collection.find({});
    all_db_users.forEach((user) => {
      console.log(user);
    });
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

runUpdateMany().catch(console.dir);
