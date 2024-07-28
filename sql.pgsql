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