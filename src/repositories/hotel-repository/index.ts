import { prisma } from "@/config";

async function getAllHotels() {
  return prisma.hotel.findMany();
}

async function getRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    }
  });
}

const hotelRepository = {
  getAllHotels,
  getRoomsByHotelId
};

export default hotelRepository;
