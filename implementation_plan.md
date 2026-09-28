# Kế hoạch triển khai: Cinematic Portfolio Website (Lấy cảm hứng từ hieubk.vn)

## 1. Tổng quan dự án (Project Overview)
Xây dựng một Single Page Application (SPA) Portfolio cho Videographer / Content Creator / Video Editor tại TP.HCM. Thiết kế mang phong cách **Cinematic Dark Theme** cao cấp, tinh tế, tối giản tương tự như phong cách của **hieubk.vn**, kết hợp hiệu ứng cuộn trang mượt mà (smooth scrolling) và chuyển cảnh phân đoạn (Scenes) bằng GSAP và Lenis.

---

## 2. Kiến trúc & Công nghệ (Tech Stack)
- **HTML5 & Semantic SEO**: Cấu trúc chuẩn SEO, OpenGraph tags, semantic tags (`header`, `main`, `section`, `footer`).
- **Tailwind CSS & Custom CSS**:
  - Tailwind CSS cho utility-first layout linh hoạt, responsive đa thiết bị.
  - Custom CSS cho hiệu ứng cinematic (film grain, vignette, glowing borders, custom scrollbar, scanlines).
- **JavaScript & Animation Libraries**:
  - **GSAP 3 + ScrollTrigger**: Kích hoạt hoạt ảnh mượt mà khi cuộn tới từng Cảnh (Scene entry/exit, parallax, text reveal).
  - **Lenis Smooth Scroll**: Đem lại trải nghiệm cuộn chuột có quán tính mượt mà chuẩn cinematic.
  - **Custom Video Modal / Lightbox**: Xem video độ phân giải cao khi nhấn vào bất kỳ dự án nào.
- **Media & Assets**:
  - Các video MP4 bản quyền mở / stream mượt mà đại diện cho từng thể loại: Hero Showreel, Sports/Action, Corporate Events, 9:16 Vertical Reels.
  - Fallback poster images chất lượng cao, tối ưu hóa kích thước và tốc độ tải.

---

## 3. Cấu trúc thư mục (File Structure)
```
/g/Antigravity/
├── index.html                 # Trang chủ SPA đầy đủ các section
├── css/
│   └── style.css              # Custom styling, film grain, typography, lens flare/vignette
├── js/
│   ├── main.js                # Logic khởi tạo GSAP, Lenis, Video Modal, Filter, Copy Email
│   └── data.js                # Danh sách dữ liệu các phân cảnh và dự án (dễ dàng chỉnh sửa)
├── assets/
│   ├── videos/                # File video hoặc URL CDN tối ưu
│   └── images/                # Poster fallback, thumbnails, logo
└── implementation_plan.md     # Bản kế hoạch chi tiết này
```

---

## 4. Chi tiết các Phân cảnh & Tính năng (Core Sections & Features)

### 4.1. Navigation & Global HUD (Heads-Up Display)
- **Timecode Ticker**: Hiển thị timecode chạy thời gian thực `[00:14:32:18]` chuẩn dựng phim chuyên nghiệp.
- **Location & Status**: `SAIGON, VN [UTC+7] • AVAILABLE FOR BOOKING`.
- **Menu điều hướng**: Phím tắt cuộn nhanh đến các Cảnh: `01. SPORTS`, `02. CORPORATE`, `03. SHORT-FORM`, `ABOUT`, `CONTACT`.
- **Audio Ambience Switch**: Nút bật/tắt âm thanh nền cinematic (tùy chọn tinh tế).

### 4.2. Hero Section (Phân cảnh Mở đầu)
- **Video Showreel Background**: Video nền 16:9 full viewport, loop, muted, autoplay, phủ lớp film grain & vignette.
- **Headline mạnh mẽ**: Typography cỡ lớn, hiệu ứng chữ xuất hiện từng chữ (Letter reveal).
  - `[TÊN BẠN]` — **VIDEOGRAPHER | CONTENT CREATOR | VIDEO EDITOR**.
- **Call-to-Action**:
  - Nút `[▶ XEM SHOWREEL CHÍNH]` (Mở pop-up video full HD có âm thanh).
  - Nút `[LIÊN HỆ DỰ ÁN]`.
- **Thanh chỉ báo cuộn**: Biểu tượng cuộn kèm thông số `24.00 FPS // 4K PRORES`.

### 4.3. Phân cảnh 01: CẢNH 01 - Sports & Action (Thể thao & Tốc độ cao)
- **Ý tưởng & Nhịp điệu**: Video nhịp độ cao, động tác mạnh mẽ, fitness, gym, võ thuật (Muay Thai/Boxing), racing.
- **Bố cục (Layout)**:
  - Grid bất đối xứng (Cinematic Asymmetric Grid).
  - Thẻ dự án hiển thị thời lượng (ví dụ: `01:15`), tỷ lệ khung hình `2.39:1 Anamorphic`, khách hàng và vai trò (Director / DP / Colorist).
  - Hiệu ứng hover: phóng to nhẹ, tự động phát video preview khi rê chuột qua.

### 4.4. Phân cảnh 02: CẢNH 02 - Corporate Events (Sự kiện Doanh nghiệp & Hội thảo)
- **Ý tưởng & Nhịp điệu**: Sang trọng, chỉn chu, ánh sáng hội nghị, gala dinner, lễ ra mắt sản phẩm cao cấp.
- **Bố cục (Layout)**:
  - Dạng danh sách thẻ ngang (Horizontal Editorial Showcase) hoặc Grid 2 cột sắc nét.
  - Hiển thị logo/tên đối tác, quy mô sự kiện, phong cách quay phóng sự (Recap / Highlight / Live multicam).
  - Marquee dải băng đối tác / khách hàng đã từng hợp tác.

### 4.5. Phân cảnh 03: CẢNH 03 - Content Creation (Short-form 9:16)
- **Ý tưởng & Nhịp điệu**: Xu hướng TikTok, Instagram Reels, YouTube Shorts, TVC ngắn.
- **Bố cục (Layout)**:
  - Grid định dạng dọc chuẩn tỉ lệ `9:16` mô phỏng điện thoại cao cấp hoặc giao diện social media không viền.
  - Chỉ số ấn tượng: Lượt view, hook visual, sound-driven pacing.
  - Click để xem trực tiếp video dọc trong popup tối ưu màn hình điện thoại & máy tính.

### 4.6. About Me (Về tôi & Triết lý hình ảnh)
- **Phong cách**: Minimalist Editorial phông nền đen sâu.
- **Nội dung**:
  - Đoạn giới thiệu súc tích về người kể chuyện bằng hình ảnh sống tại TP. Hồ Chí Minh.
  - **Workflow & Kỹ năng**: Storyboarding, Cinematography, DaVinci Resolve Color Grading, Sound FX.
  - **Trang thiết bị (Gear Bag)**: Sony FX3 / FX6, ống kính Cinema Anamorphic, Gimbal Ronin, Flycam FPV / DJI.
  - **Chỉ số năng lực**: `5+ Năm kinh nghiệm`, `100+ Dự án hoàn thành`, `20M+ Lượt tiếp cận`.

### 4.7. Footer & Booking (Liên hệ & Đặt lịch quay)
- **Headline kêu gọi**: `"READY TO ROLL CAMERA? HÃY CÙNG TẠO NÊN NHỮNG KHUNG HÌNH ĐỈNH CAO."`
- **Bộ thông tin kết nối**:
  - Email tương tác: Nhấn 1-chạm sao chép email kèm thông báo toast.
  - Hotline / Zalo / Telegram / WhatsApp.
  - Các nền tảng: YouTube, Vimeo, Instagram, TikTok, Behance.
  - Form gửi tin nhắn nhanh (Tên, Thể loại dự án cần quay, Ngày dự kiến, Gửi yêu cầu).

---

## 5. Các hiệu ứng hình ảnh Cinematic nổi bật
1. **Custom Magnetic Cursor**: Con trỏ chuột chuyển động theo quán tính, đổi hình thái thành nhãn `[PLAY]` khi hover vào video card.
2. **Film Grain Canvas / SVG Overlay**: Lớp hạt nhựa analog đem lại cảm giác điện ảnh chân thực.
3. **GSAP ScrollTrigger Panning**: Từng phân cảnh xuất hiện với hiệu ứng trượt mượt mà, số phân cảnh `[CẢNH 01]`, `[CẢNH 02]`, `[CẢNH 03]` nổi bật.
4. **Interactive Video Lightbox**: Trình phát video chuyên nghiệp hỗ trợ tua, âm lượng, đóng mở nhanh bằng phím `ESC` hoặc nút bấm.

---

## 6. Lộ trình thực hiện từng bước (Step-by-step Execution)
1. **Bước 1**: Trình kế hoạch `implementation_plan.md` cho người dùng xem xét và xác nhận.
2. **Bước 2**: Tạo cấu trúc dự án (`index.html`, `css/style.css`, `js/main.js`, `js/data.js`).
3. **Bước 3**: Tích hợp các CDN hiện đại (Tailwind CSS, GSAP, ScrollTrigger, Lenis Smooth Scroll, Google Fonts Syne & Space Grotesk / Inter).
4. **Bước 4**: Xây dựng toàn bộ các section với dữ liệu mẫu chất lượng cao, video thực tế có thể phát ngay lập tức.
5. **Bước 5**: Tinh chỉnh responsive trên các kích thước màn hình (Mobile, Tablet, Desktop) và kiểm tra tương tác mượt mà.
6. **Bước 6**: Kiểm thử trải nghiệm thực tế với trình duyệt, tối ưu hiệu năng và bàn giao hoàn thiện.
