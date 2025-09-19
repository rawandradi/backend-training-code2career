import { resetAll } from "../../shared/utils/reset";

beforeEach(() => {
  resetAll();
  process.env.JWT_SECRET = process.env.JWT_SECRET || "test_secret";
});
