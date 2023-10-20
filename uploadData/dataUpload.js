import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser'

const uri = process.env.MONGO_URL;  // change to local connection to insert in local DB

//collection name
const collectionName = 'jobs';

//path of JSON/CSV file
const filePath = 'jobs-data.json';

async function importJSON(req, res) {
  try {
    // Check the file extension
    const fileExtension = path.extname(filePath).toLowerCase();

    // Connect to MongoDB Atlas
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db();
    const collection = db.collection(collectionName);

    if (fileExtension === '.json') {
      // JSON file import
      const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      await collection.insertMany(jsonData);
    } else if (fileExtension === '.csv') {
      // CSV file import
      const csvData = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
          csvData.push(data);
        })
        .on('end', async () => {
          await collection.insertMany(csvData);
        });
    } else {
      console.error('Unsupported file type. Import aborted.');
      return res.send({message: "Unsupported file type. Import aborted."});;
    }

    console.log('Data import completed.');
    res.send({message: "Data import completed."});
    client.close();

  } catch (err) {
    console.error('Error connecting to MongoDB Atlas: ', err);
    res.send({message: err.message});
  }
}

export default importJSON;
