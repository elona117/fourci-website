import { connectToDatabase } from '../../utils/mongodb.js';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const resources = await db.collection('resources').find({}).toArray();
      res.status(200).json(resources);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const resource = { ...req.body, createdAt: new Date(), updatedAt: new Date() };
      const result = await db.collection('resources').insertOne(resource);
      res.status(201).json({ ...resource, _id: result.insertedId });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}