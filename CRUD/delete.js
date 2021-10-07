const { MongoClient, ObjectID } = require('mongodb');
const { url } = require('../url');
const client = new MongoClient(url, { useUnifiedTopology: true });

// The database to use
const dbName = 'test';

// .deleteOne(query, options)
// .deleteMany(query, options)

async function runDeleteOne() {
  try {
    await client.connect();
    console.log('Connected correctly to server');
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection('users');

    deleted_from_db = await users_collection.deleteOne({
      _id: ObjectID('5fabaef2ae39d0dca7488936'),
    });
    console.log(deleted_from_db);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

// runDeleteOne().catch(console.dir);

async function runDeleteMany() {
  try {
    await client.connect();
    console.log('Connected correctly to server');
    const db = client.db(dbName);

    // Use the collection named "users"
    const users_collection = db.collection('users');

    deleted_from_db = await users_collection.deleteMany();
    // deleted_from_db = await users_collection.deleteMany({});
    console.log(deleted_from_db);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

runDeleteMany().catch(console.dir);
