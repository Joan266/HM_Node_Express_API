export const RoomQueries = {
  getRooms: `
      SELECT 
          rooms.id, 
          rooms.roomNumber, 
          rooms.status, 
          rooms.rate, 
          rooms.price, 
          rooms.description, 
          room_types.name AS roomType 
      FROM rooms 
      JOIN room_types ON rooms.roomType = room_types.id;
  `,

  getSingleRoom: `
      SELECT 
          rooms.id, 
          rooms.roomNumber, 
          rooms.status, 
          rooms.rate, 
          rooms.price, 
          rooms.description, 
          room_types.name AS roomType 
      FROM rooms 
      JOIN room_types ON rooms.roomType = room_types.id 
      WHERE rooms.id = ?;
  `,

  createRoom: `
      INSERT INTO rooms (roomNumber, roomType, status, rate, price, description) 
      VALUES (?, ?, ?, ?, ?, ?);
  `,

  updateRoom: `
      UPDATE rooms 
      SET roomNumber = ?, roomType = ?, status = ?, rate = ?, price = ?, description = ? 
      WHERE id = ?;
  `,

  deleteRoom: `
      DELETE FROM rooms 
      WHERE id = ?;
  `
};