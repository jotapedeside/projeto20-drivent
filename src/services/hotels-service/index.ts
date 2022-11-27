import { forbiddenError, notFoundError, unauthorizedError } from "@/errors";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function getAllHotels(userId: number) {
  const enrollmentId = await getUserEnrollment(userId);
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollmentId);
  if (!ticket) throw notFoundError();
  else if (!ticket.TicketType.includesHotel) throw forbiddenError();
  else if (ticket.status === "RESERVED") throw unauthorizedError();
  
  const hotels = await hotelRepository.getAllHotels();

  return hotels;
}

async function getHotelRooms(userId: number, hotelId: string) {
  const hotel = Number(hotelId);
  const enrollmentId = await getUserEnrollment(userId);
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollmentId);

  if (!ticket) throw notFoundError();
  else if (!ticket.TicketType.includesHotel) throw forbiddenError();
  else if (ticket.status === "RESERVED") throw unauthorizedError();

  const rooms = await hotelRepository.getRoomsByHotelId(hotel);

  return rooms;  
}

async function getUserEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  return enrollment.id;
}

const hotelService = {
  getAllHotels,
  getHotelRooms,
  getUserEnrollment
};

export default hotelService;
