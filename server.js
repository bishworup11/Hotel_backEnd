// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Database configuration
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Successfully connected to the database');
  }
});

// Hotel Model
class Hotel {
  static async getBySlug(slug) {
    const query = `
      SELECT h.*, array_agg(hi.image_url) as images
      FROM hotels h
      LEFT JOIN hotel_images hi ON h.id = hi.hotel_id
      WHERE h.slug = $1
      GROUP BY h.id
    `;
    const result = await pool.query(query, [slug]);
    return result.rows[0];
  }

  static async create(hotelData) {
    const {
      slug,
      title,
      description,
      guest_count,
      bedroom_count,
      bathroom_count,
      amenities,
      host_name,
      host_image,
      address,
      latitude,
      longitude
    } = hotelData;

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const hotelQuery = `
        INSERT INTO hotels 
        (slug, title, description, guest_count, bedroom_count, bathroom_count, amenities, host_name, host_image, address, latitude, longitude)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
      `;
      const hotelResult = await client.query(hotelQuery, [
        slug, title, description, guest_count, bedroom_count, bathroom_count, 
        amenities, host_image, host_name, address, latitude, longitude
      ]);

      const newHotel = hotelResult.rows[0];

      if (hotelData.images && hotelData.images.length > 0) {
        const imageQuery = `
          INSERT INTO hotel_images (hotel_id, image_url)
          VALUES ($1, $2)
        `;
        for (let image_url of hotelData.images) {
          await client.query(imageQuery, [newHotel.id, image_url]);
        }
      }

      await client.query('COMMIT');
      return newHotel;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

// Room Model
class Room {
  static async getByHotelSlug(hotelSlug) {
    const query = 'SELECT * FROM rooms WHERE hotel_slug = $1';
    const result = await pool.query(query, [hotelSlug]);
    return result.rows;
  }

  static async create(roomData) {
    const { hotel_slug, room_slug, room_image, room_title, bedroom_count } = roomData;
    const query = `
      INSERT INTO rooms (hotel_slug, room_slug, room_image, room_title, bedroom_count)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await pool.query(query, [hotel_slug, room_slug, room_image, room_title, bedroom_count]);
    return result.rows[0];
  }
}

// Hotel Routes
app.get('/api/hotel/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(`Fetching hotel details for slug: ${slug}`);
    
    const hotel = await Hotel.getBySlug(slug);

    if (!hotel) {
      console.log(`Hotel not found for slug: ${slug}`);
      return res.status(404).json({ error: 'Hotel not found' });
    }

    res.json(hotel);
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.post('/api/hotel', upload.array('images', 5), async (req, res) => {
  try {
    const hotelData = req.body;
    hotelData.images = req.files.map(file => `/uploads/${file.filename}`);
    const newHotel = await Hotel.create(hotelData);
    res.status(201).json(newHotel);
  } catch (error) {
    console.error('Error creating hotel:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Room Routes
app.get('/api/hotel/:slug/rooms', async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(`Fetching room information for hotel slug: ${slug}`);
    
    const rooms = await Room.getByHotelSlug(slug);
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching room information:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.post('/api/room', upload.single('room_image'), async (req, res) => {
  try {
    const roomData = req.body;
    if (req.file) {
      roomData.room_image = `/uploads/${req.file.filename}`;
    }
    const newRoom = await Room.create(roomData);
    res.status(201).json(newRoom);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});