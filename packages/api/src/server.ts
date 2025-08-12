// File này sẽ quản lý network layer.
import "dotenv/config";
import app from "./app";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
