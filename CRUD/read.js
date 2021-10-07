const { MongoClient, ObjectID } = require('mongodb');
const { url } = require('../url');
const client = new MongoClient(url, { useUnifiedTopology: true });

// The database to use
const dbName = 'test';

// .findOne(query, projection)
// .find(query, projection)
// The first argument is a query. It is the filter you can use to specify which documents you want to retrieve. It is optional because you can leave it blank. Leaving it blank returns all documents in a collection.
// Instead of leaving it blank, you can pass an empty object .find({}). This also returns all documents from the collection. For now, you will leave it blank or pass an empty object.
// The second argument is the projection. The projection declares the fields to return for each document that matches the query. If you want all the fields for each document, leave this argument blank.

async function runFindOne() {
  try {
    await client.connect();
    console.log('Connected correctly to server');
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection('users');

    // findone
    one_db_user = await users_collection.findOne();
    console.log(one_db_user);

    one_db_user2 = await users_collection.findOne({
      _id: ObjectID('60af72dee71898749e7e3b4c'),
    });
    console.log(one_db_user2); // = the cursor object. To iterate on a cursor object, you can use .forEach or use .toArray() (when declaring the result; .toArray() returns an array "that contains all the documents from a cursor.")

    // find
    // Get all users
    // all_db_users = await users_collection.find();

    // // Print each user to the console
    // all_db_users.forEach((user) => console.log(user));
    // all_db_users.forEach((user) => console.log(user.first));
    // all_db_users.forEach((user) => console.log(typeof user));
    // console.log(all_db_users.toArray());
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

runFindOne().catch(console.dir);

async function runFind() {
  try {
    await client.connect();
    console.log('Connected correctly to server');
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection('users');

    // find
    // Get all users
    all_db_users = await users_collection.find();

    await all_db_users.forEach((user) => console.log(user));
    await all_db_users.forEach((user) => console.log(user.first));
    await all_db_users.forEach((user) => console.log(typeof user));

    all_db_users2 = await users_collection.find().toArray();
    console.log(all_db_users2);

    // Print each user to the console
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

runFind().catch(console.dir);
