import { connectToDatabase } from '../../utils/mongodb.js';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const result = await db.collection('resources').findOneAndUpdate(
        { id: id },
        { ...req.body, updatedAt: new Date() },
        { returnDocument: 'after' }
      );
      if (!result.value) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      res.status(200).json(result.value);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const result = await db.collection('resources').findOneAndDelete({ id: id });
      if (!result.value) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      res.status(200).json({ message: 'Resource deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}