const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/servicesDB')
    .then(() => console.log("Database Connected"))
    .catch(err => console.log(err));

const serviceSchema = new mongoose.Schema({
    title: String,
    slug: String,
    description: String,
    details: String,
    category: String,
    price: String,
    status: { type: String, default: 'active' }
});
const Service = mongoose.model('Service', serviceSchema);

const seedDB = async () => {
    const count = await Service.countDocuments();
    if (count === 0) {
        await Service.create([
            { 
                title: "Custom Web Solutions", 
                slug: "custom-web", 
                description: "Hand-crafted, responsive websites built for conversion.", 
                details: "We build tailored web experiences using modern frameworks. No templates, just clean code optimized for performance, accessibility, and high-speed loading across all devices.",
                category: "Development",
                price: "$1,500"
            },
            { 
                title: "Brand Identity", 
                slug: "brand-design", 
                description: "Complete visual systems that define your business.", 
                details: "Professional branding services including logo design, typography selection, and color palette development. We create a cohesive look that tells your brand's unique story.",
                category: "Design",
                price: "$800"
            },
            { 
                title: "E-Commerce Strategy", 
                slug: "ecom-growth", 
                description: "Scalable online stores built on Shopify and WooCommerce.", 
                details: "We design and develop high-converting online stores. Our focus is on seamless checkout flows, inventory management integration, and secure payment processing to grow your sales.",
                category: "Marketing",
                price: "$2,200"
            }
        ]);
        console.log("PULSE content seeded!");
    }
};
seedDB();

app.get('/services', async (req, res) => {
    const services = await Service.find({ status: 'active' });
    res.json(services);
});

app.listen(5000, () => console.log('PULSE Server Live'));