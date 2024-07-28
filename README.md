# Hotel Booking API

This is a RESTful API for a hotel booking system built with Node.js, Express, and PostgreSQL. It allows users to view hotel details, room information, and create new hotels and rooms with image upload functionality.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Sample Data](#sample-data)
- [Contributing](#contributing)
- [License](#license)

## Features

- Retrieve hotel details
- List rooms for a specific hotel
- Create new hotels with multiple image uploads
- Add new rooms with image upload
- PostgreSQL database for data persistence
- Image storage in local 'uploads' folder

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- PostgreSQL (v12 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/hotel-booking-api.git
   cd hotel-booking-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory with the following content:
   ```
   DB_USER=your_username
   DB_HOST=your_host
   DB_NAME=your_database_name
   DB_PASSWORD=your_password
   DB_PORT=5432
   PORT=5000
   ```

2. Replace the placeholder values with your actual PostgreSQL credentials and desired port number.

## Running the Application

1. Start the server:
   ```
   node server.js
   ```

2. The API will be available at `http://localhost:5000` (or the port you specified in the `.env` file).

## API Endpoints

- `GET /api/hotel/:slug` - Get hotel details
- `POST /api/hotel` - Create a new hotel (with image upload)
- `GET /api/hotel/:slug/rooms` - Get rooms for a specific hotel
- `POST /api/room` - Create a new room (with image upload)

## Database Schema

The application uses the following database schema:

### Hotels Table
```sql
CREATE TABLE hotels (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  guest_count INTEGER,
  bedroom_count INTEGER,
  bathroom_count INTEGER,
  amenities TEXT[],
  host_name VARCHAR(255),
  host_image VARCHAR(255),
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8)
);
```

### Hotel Images Table
```sql
CREATE TABLE hotel_images (
  id SERIAL PRIMARY KEY,
  hotel_id INTEGER REFERENCES hotels(id),
  image_url VARCHAR(255)
);
```

### Rooms Table
```sql
CREATE TABLE rooms (
  id SERIAL PRIMARY KEY,
  hotel_slug VARCHAR(255) REFERENCES hotels(slug),
  room_slug VARCHAR(255),
  room_image VARCHAR(255),
  room_title VARCHAR(255),
  bedroom_count INTEGER
);
```

## Sample Data

To populate your database with sample data, run the SQL commands provided in the `sample_data.sql` file.
e.



## Sample Data

To populate your database with sample data, you can use the following SQL commands:

```sql
-- Sample data for hotels table
INSERT INTO hotels (slug, title, description, guest_count, bedroom_count, bathroom_count, amenities, host_name, host_image, address, latitude, longitude)
VALUES 
('seaside-villa', 'Seaside Villa', 'A beautiful villa overlooking the ocean', 6, 3, 2, ARRAY['Wi-Fi', 'Pool', 'Beach Access'], 'John Doe', '/uploads/host-john-doe.jpg', '123 Coastal Road, Beachtown', 34.052235, -118.243683),
('mountain-lodge', 'Mountain Lodge', 'Cozy lodge in the heart of the mountains', 8, 4, 3, ARRAY['Wi-Fi', 'Fireplace', 'Hiking Trails'], 'Jane Smith', '/uploads/host-jane-smith.jpg', '456 Mountain Pass, Alpineville', 39.739236, -104.990251),
('city-loft', 'Downtown City Loft', 'Modern loft in the city center', 2, 1, 1, ARRAY['Wi-Fi', 'Gym', 'Rooftop Terrace'], 'Mike Johnson', '/uploads/host-mike-johnson.jpg', '789 Main Street, Metropolis', 40.712776, -74.005974);

-- Sample data for hotel_images table
INSERT INTO hotel_images (hotel_id, image_url)
VALUES 
(1, '/uploads/hotel1.jpg'),
(1, '/uploads/hotel2.jpg'),
(1, '/uploads/hotel3.jpg'),
(1, '/uploads/hotel4.jpg'),
(1, '/uploads/hotel5.jpg'),
(1, '/uploads/hotel6.jpg'),
(1, '/uploads/hotel7.jpg'),
(1, '/uploads/hotel8.jpg'),
(1, '/uploads/hotel9.jpg'),
(1, '/uploads/hotel10.jpg'),
(1, '/uploads/hotel11.jpg'),
(2, '/uploads/hotel11.jpg'),
(2, '/uploads/hotel11.jpg'),
(3, '/uploads/hotel11.jpg'),
(3, '/uploads/hotel11.jpg');

-- Sample data for rooms table
INSERT INTO rooms (hotel_slug, room_slug, room_image, room_title, bedroom_count)
VALUES 
('seaside-villa', 'master-suite', '/uploads/room1.jpg', 'Master Suite', 1),
('seaside-villa', 'ocean-view-room', '/uploads/room2.jpg', 'Ocean View Room', 1),
('seaside-villa', 'garden-room', '/uploads/room3.jpg', 'Queen Room', 1),
('seaside-villa', 'garden-room', '/uploads/room4.jpg', 'Garden Room', 1),
('seaside-villa', 'garden-room', '/uploads/room5.jpg', 'Garden Room', 1),
('seaside-villa', 'garden-room', '/uploads/room6.jpg', 'Garden Room', 1),
('mountain-lodge', 'pine-suite', '/uploads/mountain-lodge-pine-suite.jpg', 'Pine Suite', 1),
('mountain-lodge', 'elk-room', '/uploads/mountain-lodge-elk-room.jpg', 'Elk Room', 1),
('mountain-lodge', 'bear-den', '/uploads/mountain-lodge-bear-den.jpg', 'Bear Den', 2),
('city-loft', 'urban-suite', '/uploads/city-loft-urban-suite.jpg', 'Urban Suite', 1);
```

To use this sample data:

1. Make sure your PostgreSQL database is running and you're connected to the correct database.
2. Copy the SQL commands above.
3. Paste these commands into your PostgreSQL client (e.g., psql command line, pgAdmin, or any other database management tool you're using).
4. Execute the commands to insert the data into your tables.

This sample data provides a good starting point for testing your API. It includes:
- Three hotels with varying characteristics
- Multiple images for each hotel
- Several rooms for each hotel

After inserting this data, you can test your API endpoints to retrieve hotel and room information.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT Licens