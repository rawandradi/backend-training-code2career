import request from "supertest";
import { app } from "../../../server";

export const api = () => request(app);
