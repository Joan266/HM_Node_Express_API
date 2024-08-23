export interface RoomInterface {
  id?: number; 
  roomNumber: number;
  roomType: number; 
  status: number; 
  rate: number;
  price: number;
  description: string;
}

export interface RoomTypeInterface {
  id?: number; 
  name: string;
  description: string;
}

export interface AmenityInterface {
  id?: number; 
  name: string;
  description: string;
}