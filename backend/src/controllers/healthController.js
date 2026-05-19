import { getMongoStatus } from "../config/db.js";

export const getHealth = (_req, res) => {
  res.json({
    ok: true,
    mongo: getMongoStatus(),
  });
};
