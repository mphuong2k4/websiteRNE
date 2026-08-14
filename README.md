# right-now-education-website

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-hacbeakb)

## RNE Admin CMS

Trang quản trị nằm tại #/admin, ví dụ khi chạy local:

    http://localhost:5173/#/admin

Chức năng:

- Tạo, sửa, xóa bài viết; lưu nháp hoặc xuất bản.
- Quản lý SEO, ảnh đại diện, chuyên mục, FAQ và nguồn tham khảo.
- Chỉnh trực tiếp mọi đoạn chữ và hình ảnh trên từng trang.
- Tổng hợp cả bài viết có sẵn trong mã nguồn và bài tạo từ CMS.
- Quản lý nhiều cụm hình ảnh học viên, tải một hoặc nhiều ảnh từ máy.
- Tải ảnh từ máy trong visual editor hoặc trình soạn bài viết.
- Bài đã xuất bản xuất hiện trực tiếp ở trang chủ và Insights.

### Chạy thử cục bộ

    npm install
    npm run dev

Admin không có tài khoản hoặc dữ liệu dự phòng trên trình duyệt. Nếu thiếu cấu hình Supabase, trang quản trị sẽ bị khóa và hiển thị hướng dẫn kết nối database.

### Cấu hình production với Supabase

1. Sao chép .env.example thành .env và điền URL cùng anon key của Supabase.
2. Chạy migration trong supabase/migrations/20260814090000_create_cms.sql.
3. Chạy migration supabase/migrations/20260814100000_create_site_assets.sql để tạo kho ảnh.
4. Chạy migration supabase/migrations/20260814110000_harden_admin_access.sql để bật bảng phân quyền và RLS.
5. Tạo tài khoản trong Supabase Authentication.
6. Thêm UUID của tài khoản đó vào bảng public.admin_users.
7. Khởi động hoặc build lại ứng dụng.

Khi Supabase được cấu hình, #/admin yêu cầu đăng nhập và kiểm tra tài khoản trong public.admin_users. Khách truy cập chỉ đọc được bài published; tài khoản xác thực nhưng không thuộc admin_users vẫn không có quyền đọc dữ liệu nháp, sửa nội dung hoặc upload ảnh.

### Chỉnh trực tiếp toàn website

Trong #/admin, chọn Sửa mọi vị trí. Chọn trang cần sửa trên thanh công cụ, sau đó:

- Click vào chữ để sửa nội dung và lưu.
- Click vào ảnh để tải ảnh mới từ máy.
- Chọn Khôi phục gốc để xóa thay đổi tại vị trí đó.
- Dùng danh sách trang trên thanh công cụ để sửa Header, Footer và mọi trang nội dung.
