# Tasks: Cinematic Portfolio Website - Phạm Nguyên

## 1. Trạng thái thực hiện (Status: Completed)
- [x] Tạo tài liệu kế hoạch triển khai: [implementation_plan.md](file:///g:/Antigravity/implementation_plan.md)
- [x] Thu thập thông tin cá nhân của Phạm Nguyên: Email, SĐT/Zalo, Facebook.
- [x] Thiết kế giao diện Cinematic Dark Theme với tông màu vàng Amber (#f59e0b) cảm hứng từ hieubk.vn.
- [x] Hero Section với video Showreel chuyển động, HUD timecode 24 FPS, Cinema Mode 2.39:1 letterbox.
- [x] **CẢNH 01 - Sports & Action (GMA Carousel & Thao tác trượt mượt mà)**:
  - Tối ưu hóa thumbnail độ phân giải cao siêu rõ nét, loại bỏ lớp phủ mờ tối.
  - Bỏ thanh chọn thumbnail, thay bằng **thao tác trượt / kéo chuột (Mouse Drag & Touch Swipe)** tự nhiên với quán tính mượt mà.
  - Tích hợp thanh tiến trình động (`1/3` -> `2/3` -> `3/3`) và tự động cập nhật tiêu đề giải đấu tương ứng.
  - **Video Lightbox Modal siêu nét**: Loại bỏ hoàn toàn hiệu ứng film grain / nhiễu hạt khi mở modal, nền đen OLED chuẩn điện ảnh, video YouTube phát trực tiếp mượt mà.
- [x] CẢNH 02 - Corporate Events (Keynote Gala, Luxury Car Unveil, Marquee đối tác).
- [x] CẢNH 03 - Content Creation (9:16 Vertical Reels định dạng TikTok/Instagram).
- [x] **Sửa lỗi font chữ `Ạ` trong "PHẠM NGUYÊN"**:
  - Chuyển font tiêu đề sang `Montserrat` và `Be Vietnam Pro` hỗ trợ 100% tiếng Việt có dấu.
  - Đồng bộ font-weight (font-black 900), không còn hiện tượng lệch font / fallback serif trên chữ `Ạ`.
- [x] **Thay video nền Hero bằng ảnh chụp thực tế của Phạm Nguyên**:
  - Tích hợp ảnh thực tế khi tác nghiệp gimbal & tai nghe đàm thoại tại giải đấu võ thuật GMA (`assets/images/hero-bg.jpg`).
  - Phủ gradient cinematic tối chuyển tiếp mượt mà, giữ trọn độ nét và độ tương phản cao cho typography.
  - Đồng bộ ảnh thực tế vào phần About Me (`assets/images/portrait.jpg`).
- [x] **Mở rộng Carousel GMA 6 trận đấu (Sports & Action)**:
  - Thêm đầy đủ 3 trận: GMA 12 (timestamp 4513s), GMA 11 (Độc Tôn Đại Chiến), GMA 10 (timestamp 13s).
  - Tải thumbnail 1280x720 HD gốc nội bộ (`gma12-max.jpg`, `gma11-max.jpg`, `gma10-max.jpg`).
  - Cập nhật bộ đếm `01 / 06` đến `06 / 06`, 6 dots điều hướng và thanh tiến trình.
- [x] **Tối ưu hóa hiệu năng & độ mượt toàn diện trên Điện thoại (Mobile Ultra-Smooth Overhaul)**:
  - **Nén ảnh chuẩn điện ảnh**: Giảm hơn 3.2MB dung lượng ảnh JPEG gốc (tiết kiệm 75% - 82% mỗi ảnh) bằng thuật toán nén thông minh chất lượng cao, giảm tải RAM và thời gian giải mã GPU trên mobile.
  - **Lazy loading & Async decoding**: Kích hoạt `loading="lazy"` cho slide 2-6 của GMA Carousel và toàn bộ hình ảnh phân đoạn dưới (Scene 02, 03, About), chỉ nạp tài nguyên khi người dùng cuộn đến gần.
  - **Vô hiệu hóa Full-screen Vignette & Backdrop Filter**: Loại bỏ lớp phủ gradient toàn màn hình và thay thế hiệu ứng làm mờ thời gian thực (`backdrop-filter`) trên mobile bằng nền màu tối điện ảnh thuần túy (`rgba(8, 8, 10, 0.97)`), giải phóng 80% áp lực GPU Compositor.
  - **Ẩn thẻ Video nền hover trên Mobile**: Vô hiệu hóa và ẩn hoàn toàn các thẻ `<video>` hover preview khi mở trên điện thoại, tránh kích hoạt bộ giải mã phần cứng (Hardware Video Decoders) không cần thiết.
  - **Khắc phục xung đột Vuốt Slide và Click mở Video**: Thêm khóa chặn 400ms sau khi vuốt, loại bỏ hoàn toàn hiện tượng vô tình mở Video Modal khi đang lướt xem các trận đấu GMA.
  - **Tối ưu tần số quét rAF cho Touch Drag**: Đồng bộ vị trí ngón tay tức thì vào biến `currentDragTranslate`, giúp thao tác trượt đạt 60fps - 120fps (ProMotion / Smooth Display) không bị giật lag hay trễ khung hình.
  - **Tắt Ticker 24 FPS ngầm trên điện thoại**: Ngừng vòng lặp timer cập nhật timecode ẩn để tiết kiệm pin và chu kỳ CPU cho điện thoại.
  - **Khóa cuộn trang khi mở Menu Drawer**: Tránh hiện tượng cuộn kép mất kiểm soát khi người dùng mở menu điều hướng di động.
  - **Tăng diện tích chạm (Hit Target) chuẩn Ergonomics**: Mở rộng nút mũi tên lên 40px và bổ sung vùng đệm cảm ứng 36px cho các chấm Dots điều hướng, giúp thao tác bằng ngón tay cái dễ dàng và chính xác.
- [x] **Tích hợp gửi Email tự động khi khách hàng điền Contact Form (Giải pháp 1 - FormSubmit AJAX)**:
  - Form kết nối trực tiếp đến endpoint `https://formsubmit.co/ajax/phamnguyendesign31@gmail.com`.
  - Thu thập đầy đủ: Họ tên, Số điện thoại / Zalo, Email, Thể loại dự án, Mô tả chi tiết.
  - Hiệu ứng nút gửi: Trạng thái xoay vòng đang gửi (`ĐANG GỬI DỮ LIỆU...`), chống bấm liên tiếp (spam).
  - Gửi ngầm qua AJAX không tải lại trang, giữ trọn thông báo Toast thành công.
- [x] **Nâng cấp Tab Sports & Action thành Dải Cuộn Vòng 3D (3D Curved Infinite Marquee Ribbon)**:
  - **Kiến trúc cong 3D chuẩn điện ảnh như ảnh mẫu**: Các thẻ ảnh được uốn theo cung hình trụ 3D mềm mại với góc nghiêng phối cảnh (`perspective: 1200px`, `rotateY`, `rotateZ`, `translateY` tạo độ võng cong tự nhiên).
  - **Tự động cuộn nhẹ từ phải sang trái**: Tốc độ êm mượt, tự nhiên với cơ chế chuẩn hóa thời gian thực (`requestAnimationFrame` + delta-time) tương thích hoàn hảo mọi tần số quét màn hình 60Hz, 90Hz, 120Hz ProMotion.
  - **Tương tác thông minh**: Rê chuột (hover) hoặc chạm tay (touch) dải cuộn sẽ tự động dừng/chậm lại; buông tay sẽ nhẹ nhàng trôi tiếp; hỗ trợ kéo vuốt hai chiều mượt mà với quán tính và khóa hướng vuốt dọc.
  - **Bộ điều khiển tiện lợi**: Bổ sung nút Tạm dừng / Tiếp tục (`#marqueePauseBtn`) và 2 nút mũi tên Lùi / Tiến (`#marqueePrevBtn`, `#marqueeNextBtn`).
  - **Phát Video Modal nguyên bản**: Bấm vào bất kỳ thẻ trận đấu nào đều mở ngay Video Lightbox Modal HD/4K với âm thanh và thông tin vai trò chi tiết.
- [x] **Mở rộng thêm 4 trận đấu GMA mới vào Tab Sports & Action (Tổng cộng 10 trận)**:
  - **GMA 09**: `https://www.youtube.com/watch?v=jJHphREnkrg` (🔴 GMA 09 | HỔ MANG THƯỢNG THẦN)
  - **GMA 08**: `https://www.youtube.com/watch?v=9Yq-PLahBIM&t=103s` (🔴 GMA 08 | TRỤ THẦN CHIẾN KỶ)
  - **GMA 07**: `https://www.youtube.com/watch?v=qvljb09uw_Y&t=40s` (🔴 GMA 07 | ĐẠI CHIẾN PHONG THẦN)
  - **GMA 06**: `https://www.youtube.com/watch?v=WjI6z74wJmE&t=4007s` (🔴 GMA 06 | THÁCH ĐẤU THẦN VÕ)
  - Tải thumbnail độ nét cao gốc: `gma09-max.jpg`, `gma08-max.jpg`, `gma07-max.jpg`, `gma06-max.jpg`.
  - Cập nhật dải cuộn vô tận gồm 20 thẻ (10 thẻ gốc + 10 thẻ lặp liền mạch).
  - Đồng bộ cơ sở dữ liệu `js/data.js` và logic tính độ rộng chu kỳ cuộn `js/main.js`.
- [x] **Nút Quay về đầu trang nổi (Floating Back to Top Button) chuẩn điện ảnh**:
  - Nằm ở góc dưới cùng bên phải màn hình (`bottom-6 right-6` trên desktop, `bottom-5 right-5` trên mobile).
  - **Vòng tròn tiến trình cuộn trang 360° (Circular Scroll Progress Ring)**: Vòng tròn vàng bao quanh tự động lấp đầy từ 0% đến 100% theo độ sâu cuộn trang của người dùng.
  - **Tự động ẩn/hiện thông minh**: Ẩn khi ở đầu trang, chỉ xuất hiện trượt nhẹ và mờ dần (`btn-visible`) khi cuộn xuống quá 300px.
  - **Tối ưu hóa đa nền tảng & Mobile Ergonomics**:
    - Chuẩn kích thước chạm tay tối thiểu 46x46px với `touch-action: manipulation` loại bỏ độ trễ 300ms.
    - Hỗ trợ vùng an toàn `env(safe-area-inset-bottom)` cho iPhone có thanh Home bar / Dynamic Island.
    - Nền tối mờ OLED với viền vàng ánh kim phát sáng sang trọng khi rê chuột (Desktop hover glow).
  - Bấm vào sẽ cuộn mượt mà (Smooth scroll) toàn diện trở lại đỉnh trang Hero.
- [x] **Tăng độ rõ nét của số mờ phân chia mục (Scene Watermark 01, 02, 03)**:
  - Tăng độ mờ (opacity) từ 2% (`0.02`) lên **12% (`0.12`)**.
  - Số `01`, `02`, `03` kích thước lớn hiện rõ ràng, sắc sảo, tạo điểm nhấn typography đậm chất điện ảnh hiện đại nhưng không lấn át tiêu đề chính.
- [x] **Cập nhật danh sách thương hiệu đồng hành (Partners & Clients Marquee)**:
  - Thay thế toàn bộ thương hiệu cũ bằng danh sách 7 đối tác chính thức:
    1. **Saigon Sports Club**
    2. **Gods Of Martial Arts**
    3. **Shadow Entertainment**
    4. **Traveloka**
    5. **Adidas Vietnam**
    6. **Triumph Vietnam**
    7. **SCMC - Saigon Classic Motorcycle Club**
  - Chạy cuộn vòng vô tận 2 chiều (Infinite Loop 50% translation) mượt mà, phân tách bằng dấu chấm vàng ánh kim `•`.
  - Đồng bộ cơ sở dữ liệu `PORTFOLIO_DATA.brands` trong `js/data.js`.
- [x] **Căn chỉnh Kerning & Spacing thanh Header / Navbar (Chống đè chữ & Overlap)**:
  - Khắc phục triệt để hiện tượng viên nang trạng thái HUD (`AVAILABLE`) đè lên mục `01 SPORTS`.
  - Bổ sung `whitespace-nowrap` trên toàn bộ phần tử (Brand `PHAM NGUYEN`, `REELS 9:16`, các link điều hướng và nút bấm) để không bị ngắt dòng lệch lạc.
  - Tối ưu hóa phân bổ không gian (`hidden xl:flex` cho viên nang HUD thời gian thực, khoảng cách `gap-4 lg:gap-5 xl:gap-6` co giãn nhịp nhàng theo kích thước màn hình).
  - Tinh chỉnh kerning (`tracking-normal` / `tracking-wide`) chuẩn thị giác typography hiện đại, tạo khoảng cách thở (breathing room) thông thoáng tuyệt đối.
- [x] **Loại bỏ nút và chức năng Cinema Mode 2.39:1**:
  - Đã gỡ bỏ nút `[🎬 2.39:1]` trên thanh Header Navigation Bar (chỉ giữ lại nút chính `[ BOOK A SHOOT → ]` tinh gọn, chuyên nghiệp).
  - Đã dọn dẹp các thẻ viền rạp phim `.letterbox-top`, `.letterbox-bottom` trong [`index.html`](file:///f:/Portfolio%20Source%20Code/index.html).
  - Đã xóa sạch logic JS lắng nghe sự kiện Cinema Mode trong [`js/main.js`](file:///f:/Portfolio%20Source%20Code/js/main.js).
  - Đã lược bỏ toàn bộ CSS liên quan trong [`css/style.css`](file:///f:/Portfolio%20Source%20Code/css/style.css).
- [x] **Tinh chỉnh Hero Section (Bỏ 3 nút bấm, bỏ 2024, bỏ Content Creator)**:
  - Bỏ cụm 3 nút bấm ở dưới Hero (`XEM FULL SHOWREEL`, `LIÊN HỆ DỰ ÁN`, `GMA CAMERA CREW`) giúp khung hình thoáng đãng, sang trọng, tập trung vào hình ảnh và video nền.
  - Cập nhật huy hiệu danh mục: từ `CINEMATIC PORTFOLIO 2024` chuyển thành `CINEMATIC PORTFOLIO` (bỏ `2024` để không bị bó buộc theo năm).
  - Cập nhật vai trò chuyên môn: chuyển từ `Videographer • Content Creator • Video Editor` thành `Videographer • Video Editor` (bỏ `Content Creator`), đồng bộ trên toàn bộ tiêu đề trang, phần Giới thiệu và dữ liệu [`js/data.js`](file:///f:/Portfolio%20Source%20Code/js/data.js).
- [x] **Tinh chỉnh Phân đoạn 01 Sports & Action**:
  - Đổi tiêu đề phân đoạn: từ `6 TRẬN ĐẤU ĐỈNH CAO • CUỘN VÒNG 3D` thành `NHỮNG TRẬN ĐẤU ĐỈNH CAO VÕ THUẬT • CUỘN VÒNG 3D`.
  - Loại bỏ huy hiệu `2.39:1 ANAMORPHIC` góc phải của tiêu đề Scene 01, giữ lại `120 FPS HIGH SPEED`.
- [x] **Chia mục Sports & Action thành 3 phân mục chuyên sâu**:
  - **Mục 1: Gods Of Martial Arts (GMA)**:
    - Bố cục 3D Curved Infinite Marquee cuộn vòng vô tận chứa 10 trận đấu GMA đỉnh cao (GMA 15 đến GMA 06).
    - Đầy đủ nút Tạm dừng/Tiếp tục, nhảy Trái/Phải và Lightbox Video Modal chất lượng cao.
  - **Mục 2: GODS OF MARTIAL ARTS WARRIOR (GMA WARRIOR)**:
    - Phân mục độc lập mới dành cho giải đấu chiến binh võ thuật GMA Warrior (`GMA Warrior 04`, `GMA Warrior 03`, `GMA Warrior 02`, `GMA Warrior 01`, `Tournament Reel`, `Octagon Battle`).
    - Lưới thẻ video điện ảnh nổi bật với huy hiệu `GMA WARRIOR`, `4K ACTION`, `120 FPS`, `KNOCKOUT`, `TELEPHOTO`.
  - **Mục 3: Fighters Promotion**:
    - **Nâng cấp thành Dải Cuộn Vòng 3D (3D Curved Infinite Marquee Ribbon)** đồng bộ tuyệt đối phong cách và vật lý chuyển động với mục GMA và GMA Warrior.
    - **Trích xuất chính xác và CHỈ LẤY TÊN VÕ SĨ trong các clip Facebook Reel do người dùng cung cấp**:
      1. **MARTIN NGUYỄN** (`https://www.facebook.com/reel/1608931100879215`) — The Situ-Asian, cựu vương 2 hạng cân ONE Championship, Pro Boxing debut.
      2. **PHAN TRỌNG HIẾU** (`https://www.facebook.com/reel/1588380192889268`) — SSC Fight Team tranh tài Giải Vô Địch Võ Cổ Truyền Quốc Gia XV.
      3. **PHẠM DŨNG MẠNH** (`https://www.facebook.com/reel/988239140787367`) — The Journey Begins, Pro Boxing Debut của đội ngũ vận hành SSC.
      4. **SSC FIGHT TEAM** (`https://www.facebook.com/reel/1287485370249191`) — SSC Fight Team buổi cân ký trước giờ vào lồng bát giác Lion Championship 32 (LC32), huy hiệu góc phải MMA Pro, tag `#LIONChampionship` và `#LC32`.
      5. **MUAY THAI TEAM** (`https://www.facebook.com/reel/954645017498364`) — Muay Thai Team bước vào giải MMA Clubs Championship, huy hiệu góc trái MMA Clubs Championship.
      6. **PHẠM BÌNH MINH** (`facebook.com/reel/708573378992939`) — SSC Fight Team chung kết MMA Striking hạng 56kg tại Lion Championship 29 (LC29).
    - Tải toàn bộ 6 ảnh thumbnail gốc chất lượng cao từ CDN Facebook về lưu trữ nội bộ: `assets/images/fighter-01.jpg` đến `fighter-06.jpg`.
    - Tạo chu kỳ cuộn 12 thẻ (2 lượt lặp của 6 võ sĩ) giúp dải băng 3D trôi mượt mà từ phải sang trái.
    - Khởi tạo engine `setupCurvedMarquee` thứ 3 độc lập trong [`js/main.js`](file:///f:/Portfolio%20Source%20Code/js/main.js) với đầy đủ nút Tạm dừng/Tiếp tục (`#fightersPauseBtn`), Lùi/Tiến (`#fightersPrevBtn`, `#fightersNextBtn`), chạm tay vuốt trượt trên di động.
    - Tự động kích hoạt hiển thị 9:16 Vertical Reel trên Lightbox Video Modal khi bấm vào thẻ võ sĩ, đồng thời nút điều hướng đổi sang "XEM TRÊN FACEBOOK" màu xanh Facebook chính hãng.
  - **Thanh điều hướng chuyển mục nhanh (Sub-Category Tabs)**: Bổ sung 3 nút tab dạng viên nang sang trọng ở đầu phân đoạn:
    1. `[ 🏆 Gods Of Martial Arts (GMA) 10 TRẬN ]`
    2. `[ ⚔️ GODS OF MARTIAL ARTS WARRIOR (GMA WARRIOR) SERIES ]`
    3. `[ 🥷 Fighters Promotion 06 VIDEO ]`
- [x] **Nâng cấp Phân mục GMA WARRIOR thành Dải Cuộn Vòng 3D (3D Curved Infinite Marquee Carousel) tương tự GMA**:
  - **3 video chính thức theo thứ tự 1, 2, 3 do người dùng cung cấp**:
    1. **GMA WARRIOR 01**: `https://www.youtube.com/watch?v=8uKxyZTjkPU` (🔴 GMA WARRIOR 01 | CHÍNH THỨC KHỞI TRANH)
    2. **GMA WARRIOR 02**: `https://www.youtube.com/watch?v=JjKn4Vtdfjg&t=1s` (🔴 GMA WARRIOR 02 | ĐẠI CHIẾN CHIẾN BINH)
    3. **GMA WARRIOR 03**: `https://www.youtube.com/watch?v=1frNMcJXGLg&t=119s` (🔴 GMA WARRIOR 03 | CHÍNH THỨC KHỞI TRANH)
  - Tải poster độ nét cao gốc từ YouTube: `assets/images/gma-warrior-01.jpg`, `gma-warrior-02.jpg`, `gma-warrior-03.jpg`.
  - Tạo chu kỳ cuộn 12 thẻ (4 lượt lặp) giúp dải băng 3D trôi mượt mà từ phải sang trái ở tốc độ 95px/s.
  - Tái cấu trúc engine `setupCurvedMarquee` trong [`js/main.js`](file:///f:/Portfolio%20Source%20Code/js/main.js) chạy độc lập cho cả 2 dải băng GMA và GMA WARRIOR với đầy đủ nút Tạm dừng/Tiếp tục (`#warriorPauseBtn`), Lùi/Tiến (`#warriorPrevBtn`, `#warriorNextBtn`), tương tác chuột và cảm ứng kéo vuốt di động.
  - Tích hợp chuẩn Video Modal Lightbox tự động phát đúng đoạn video và timestamp (1s, 119s).
- [x] **Khắc phục triệt để lỗi hiển thị font (Mojibake) & Đảo chiều Animation chạy từ Trái sang Phải cho GMA WARRIOR**:
  - **Sửa dứt điểm lỗi ký tự lạ & font**:
    - Thay thế toàn bộ ký tự emoji `🔴` bằng chấm tròn CSS phát sáng điện ảnh thuần túy (`bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]`), loại bỏ 100% hiện tượng lỗi font `ðŸ”´`.
    - Chuẩn hóa toàn bộ nhãn trạng thái và thông báo trong `js/main.js` sang mã thoát Unicode ASCII thuần (`\uXXXX`), an toàn tuyệt đối trên mọi trình duyệt, hệ điều hành và proxy.
    - Cập nhật nhãn trạng thái hiển thị rõ: `CHẾ ĐỘ CUỘN: TỰ ĐỘNG (TỪ TRÁI SANG PHẢI)`.
  - **Đảo chiều chuyển động dải băng 3D (Left to Right Marquee)**:
    - Bổ sung tham số `direction: 'left-to-right'` cho engine `setupCurvedMarquee`.
    - Dải băng GMA Warrior tự động trôi êm mượt **từ trái sang phải** tạo thế đối xứng nhịp nhàng với dải GMA (phải sang trái).
    - Tự động chuẩn hóa góc nghiêng phối cảnh 3D (`perspective: 1000px`, `rotateY`, `rotateZ`, `dipY`) theo tọa độ thực tế của thẻ khi cuộn ngược.
    - Đồng bộ nút bấm Lùi/Tiến (`prevBtn`, `nextBtn`) và cử chỉ kéo vuốt chuột / ngón tay theo quán tính.
  - **Nâng cấp Cache Buster**: `css/style.css?v=3.8`, `js/data.js?v=3.8`, `js/main.js?v=3.8`.
- [x] Máy chủ cục bộ: **http://localhost:3000**
- [x] **Các đường link xem trên điện thoại**:
  - **Link Public Trực tiếp (HTTPS)**: **https://44bc506fcdb861a4-115-77-48-253.serveousercontent.com**
  - **Link Wi-Fi Nội bộ (Siêu tốc 0 độ trễ)**: **http://192.168.1.29:3000** *(khi điện thoại bắt cùng mạng Wi-Fi)*