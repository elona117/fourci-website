require('dotenv').config();
const mongoose = require('mongoose');
const Resource = require('./models/Resource');

// Default resources from constants.tsx
const defaultResources = [
  {
    id: 'maiduguri-green',
    title: 'Maiduguri Green Wall Initiative',
    status: 'Ongoing',
    location: 'Borno State, Nigeria',
    description: 'A massive tree-planting campaign to combat desertification in the Sahel region, creating a natural barrier against the encroaching Sahara.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000',
    metrics: [
      { label: 'Trees Planted', value: '5,000+' },
      { label: 'Survival Rate', value: '85%' }
    ],
    content: "The Maiduguri Green Wall Initiative represents our most ambitious reforestation effort to date. By planting over 5,000 native tree species along the northern perimeter of Borno State, we are not just planting trees—we are building a legacy of resilience. This 'Green Wall' serves as a critical biological corridor that prevents soil erosion, restores local biodiversity, and provides a sustainable micro-climate for local agricultural practices. Through the involvement of local youth and traditional leaders, we have achieved a remarkable 85% survival rate for our saplings, far exceeding regional averages for arid-zone reforestation.",
    isCustom: false
  },
  {
    id: 'school-eco',
    title: 'School Eco-Clubs',
    status: 'Completed',
    location: '15 Secondary Schools',
    description: 'Establishing environmental clubs to foster climate stewardship among the next generation through hands-on education and waste innovation.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000',
    metrics: [
      { label: 'Students Reached', value: '1,200' },
      { label: 'Eco-Clubs', value: '15' }
    ],
    content: "Our School Eco-Clubs program has successfully integrated climate education into the extracurricular fabric of 15 major secondary schools. By establishing student-led environmental committees, we have empowered over 1,200 students to take ownership of their ecological footprint. Activities range from managing school-based tree nurseries to hosting 'Climate Action' debates. The program concluded its first major phase with the 'Green Campus' competition, where students innovated waste management solutions that are now being adopted by local municipal authorities.",
    isCustom: false
  },
  {
    id: 'sahel-resilience',
    title: 'Sahel Community Resilience',
    status: 'Ongoing',
    location: 'Chad Basin Region',
    description: 'Training community leaders in sustainable land management and climate-smart agriculture to protect livelihoods against drought.',
    image: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&q=80&w=2000',
    metrics: [
      { label: 'Leaders Trained', value: '250' },
      { label: 'Hectares Protected', value: '1,000' }
    ],
    content: "In the face of increasing desertification in the Chad Basin, the Sahel Community Resilience project focuses on human capacity building. We have trained over 250 community leaders in advanced soil conservation techniques and water-harvesting methods. By combining traditional knowledge with modern ecological science, these leaders are now spearheading local initiatives that have protected approximately 1,000 hectares of grazing and farmland from further degradation.",
    isCustom: false
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing resources
    await Resource.deleteMany({});
    console.log('Cleared existing resources');

    // Insert default resources
    await Resource.insertMany(defaultResources);
    console.log('Seeded default resources');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();