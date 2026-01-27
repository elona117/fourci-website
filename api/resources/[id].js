const { connectToDatabase } = require('../../backend/utils/mongodb.js');
const { ObjectId } = require('mongodb');

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const { id } = req.query;

    if (req.method === 'PUT') {
      const result = await db.collection('resources').findOneAndUpdate(
        { id: id },
        { ...req.body, updatedAt: new Date() },
        { returnDocument: 'after' }
      );
      if (!result.value) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      res.status(200).json(result.value);
    } else if (req.method === 'DELETE') {
      const result = await db.collection('resources').findOneAndDelete({ id: id });
      if (!result.value) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      res.status(200).json({ message: 'Resource deleted' });
    } else {
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: error.message });
  }
}