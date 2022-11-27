import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getAllHotels, getAllRoomsFromHotel } from "@/controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getAllHotels)
  .get("/:hotelId", getAllRoomsFromHotel);

export { hotelsRouter };
