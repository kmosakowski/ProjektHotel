export class RoomD {
  //Room
  idRoom: number;
  idHotel: number;
  floor: number;
  roomNumber: number;
  clazz: String;
  isSmoker: String;
  forDisabled: String;
  price: number;
  description: String;
  //Reservation
  idReservation: number;
  idRoom2: number;
  idGuest: number;
  fromDate: string;
  toDate: string;
  comments: string;
  canceled: string;
}
