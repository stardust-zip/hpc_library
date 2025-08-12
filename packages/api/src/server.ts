// File này sẽ quản lý network layer.

// Tạo file .env tại packages/api/
// Sau đó, khai báo PORT tại .env để sử dụng
// VD: PORT=3001
import "dotenv/config";
import app from "./app";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
