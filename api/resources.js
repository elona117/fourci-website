const { connectToDatabase } = require('../backend/utils/mongodb.js');

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    if (req.method === 'GET') {
      const resources = await db.collection('resources').find({}).toArray();
      res.status(200).json(resources);
    } else if (req.method === 'POST') {
      const resource = { ...req.body, createdAt: new Date(), updatedAt: new Date() };
      const result = await db.collection('resources').insertOne(resource);
      res.status(201).json({ ...resource, _id: result.insertedId });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: error.message });
  }
}