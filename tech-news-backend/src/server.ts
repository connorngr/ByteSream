import app from "./app.js";
import prisma
from "./config/db.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



async function testDB() {
  try {
    await prisma.$connect();
    console.log("Connected to PostgreSQL database!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

testDB();
