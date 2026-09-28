/**
 * Portfolio Data: Phạm Nguyên - Videographer | Video Editor
 * Easy to update, add, or customize anytime.
 */
const PORTFOLIO_DATA = {
  profile: {
    name: "Phạm Nguyên",
    stageName: "PHAM NGUYEN",
    title: "Videographer | Video Editor",
    location: "TP. Hồ Chí Minh, Việt Nam",
    locationShort: "SAIGON, VN",
    timezone: "UTC+7",
    status: "AVAILABLE FOR BOOKING",
    email: "phamnguyendesign31@gmail.com",
    phone: "0707841796",
    phoneFormatted: "0707 841 796",
    facebook: "https://www.facebook.com/nguyenphamne/",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
    vimeo: "https://vimeo.com",
    bio: [
      "Là một Videographer & Video Editor hoạt động tại trung tâm năng động TP. Hồ Chí Minh, tôi đam mê nắm bắt chuyển động, ánh sáng tự nhiên và biến từng khung hình thành những thước phim giàu cảm xúc và nhịp điệu.",
      "Với kinh nghiệm thực chiến từ quay phim hiện trường (DP/Gimbal Operator) đến dựng phim và chỉnh màu (DaVinci Resolve), tôi tập trung vào việc tạo nên những sản phẩm không chỉ mãn nhãn về thị giác mà còn truyền tải trọn vẹn thông điệp thương hiệu."
    ],
    stats: [
      { label: "Dự án hoàn thành", value: "85+", suffix: "Projects" },
      { label: "Lượt tiếp cận Video", value: "15M+", suffix: "Impressions" },
      { label: "Năm kinh nghiệm", value: "05+", suffix: "Years" },
      { label: "Tỉ lệ hài lòng", value: "100%", suffix: "Rating" }
    ],
    gearList: [
      { category: "Cameras", items: "Sony FX3 Cinema Line, Sony A7S III, BMPCC 6K" },
      { category: "Lenses", items: "Sony FE 24-70mm GM II, 50mm f/1.2 GM, Sirui Anamorphic 35mm/50mm" },
      { category: "Stabilizers & Drone", items: "DJI Ronin RS3 Pro, DJI Avata FPV, DJI Mini 4 Pro" },
      { category: "Lighting & Audio", items: "Aputure 300d II, Amaran 200x, Sennheiser MKH 416, DJI Mic 2" },
      { category: "Post-Production", items: "DaVinci Resolve Studio (Color Grading), Premiere Pro, After Effects" }
    ]
  },

  hero: {
    reelVideo: "assets/videos/showreel.mp4",
    poster: "assets/images/hero-poster.jpg",
    timecode: "00:00:24:00",
    fps: "24.00 FPS",
    resolution: "4K PRORES 422HQ",
    headlineSubtitle: "CINEMATIC VISUAL STORYTELLER"
  },

  brands: [
    "Saigon Sports Club",
    "Gods Of Martial Arts",
    "Shadow Entertainment",
    "Traveloka",
    "Adidas Vietnam",
    "Triumph Vietnam",
    "SCMC - Saigon Classic Motorcycle Club"
  ],

  scenes: [
    {
      id: "scene-01",
      number: "CẢNH 01",
      category: "Sports & Action",
      categoryEn: "SPORTS & ACTION",
      subsections: [
        "Gods Of Martial Arts (GMA)",
        "GODS OF MARTIAL ARTS WARRIOR (GMA WARRIOR)",
        "Fighters Promotion"
      ],
      subtitle: "NHỊP ĐỘ CAO • TỐC ĐỘ • NĂNG LƯỢNG BÙNG NỔ",
      description: "Tập trung vào các khung hình chuyển động tốc độ cao, nhịp tim rực lửa, võ thuật đối kháng, thể thao mạo hiểm và thể hình thẩm mỹ.",
      projects: [
        {
          id: "gma-15",
          title: "GMA 15 | CHÍNH THỨC KHỞI TRANH",
          client: "GMA - Gods of Martial Arts",
          year: "2024",
          aspect: "16:9 4K Live Broadcast",
          duration: "Full Fight Night",
          role: "Cinematographer & Camera Operator",
          gear: "Sony Cinema Line + Telephoto & Gimbal Setup",
          poster: "assets/images/gma15-max.jpg",
          youtubeUrl: "https://www.youtube.com/watch?v=DW8xImjETE4",
          embedUrl: "https://www.youtube.com/embed/DW8xImjETE4?autoplay=1",
          video: "assets/videos/showreel.mp4",
          tags: ["#GMA15", "#MMA", "#GodsOfMartialArts", "#LiveFight", "#SportsAction"]
        },
        {
          id: "gma-14",
          title: "GMA 14 | CHÍNH THỨC KHỞI TRANH",
          client: "GMA - Gods of Martial Arts",
          year: "2024",
          aspect: "16:9 4K Broadcast",
          duration: "Full Tournament",
          role: "Action DP & Live Cam",
          gear: "Sony FX3 + Sirui Cinema Lenses",
          poster: "assets/images/gma14-max.jpg",
          youtubeUrl: "https://www.youtube.com/watch?v=ouJZP2SBcmo",
          embedUrl: "https://www.youtube.com/embed/ouJZP2SBcmo?autoplay=1",
          video: "assets/videos/sample-clip.mp4",
          tags: ["#GMA14", "#CombatSports", "#ActionCamera", "#MMAVietnam"]
        },
        {
          id: "gma-13",
          title: "GMA 13 | CHÍNH THỨC KHỞI TRANH",
          client: "GMA - Gods of Martial Arts",
          year: "2024",
          aspect: "16:9 4K Broadcast",
          duration: "Highlight & Full Event",
          role: "Lead Action Camera Operator",
          gear: "Sony FX3 + Ronin RS3 Pro",
          poster: "assets/images/gma13-max.jpg",
          youtubeUrl: "https://www.youtube.com/watch?v=qoGojcbFQxg&t=11619s",
          embedUrl: "https://www.youtube.com/embed/qoGojcbFQxg?start=11619&autoplay=1",
          video: "assets/videos/showreel.mp4",
          tags: ["#GMA13", "#KnockoutHighlight", "#MartialArtsAction", "#HighSpeed"]
        },
        {
          id: "gma-12",
          title: "GMA 12 | CHÍNH THỨC KHỞI TRANH",
          client: "GMA - Gods of Martial Arts",
          year: "2024",
          aspect: "16:9 4K Broadcast",
          duration: "Live Fight Night",
          role: "Cinematographer & Camera Operator",
          gear: "Sony FX3 + Telephoto & Gimbal",
          poster: "assets/images/gma12-max.jpg",
          youtubeUrl: "https://www.youtube.com/watch?v=nOylD-ETCcI&t=4513s",
          embedUrl: "https://www.youtube.com/embed/nOylD-ETCcI?start=4513&autoplay=1",
          video: "assets/videos/sample-clip.mp4",
          tags: ["#GMA12", "#LongLavsPhuongHoai", "#MMAVietnam", "#ActionCamera"]
        },
        {
          id: "gma-11",
          title: "GMA 11 – ĐỘC TÔN ĐẠI CHIẾN CHÍNH THỨC KHAI HỎA! 🔥",
          client: "GMA - Gods of Martial Arts",
          year: "2024",
          aspect: "16:9 4K Broadcast",
          duration: "Championship Bout",
          role: "Action DP & Live Camera Operator",
          gear: "Sony FX3 Cinema Line + Ronin RS3 Pro",
          poster: "assets/images/gma11-max.jpg",
          youtubeUrl: "https://www.youtube.com/watch?v=N49YEqJihU4",
          embedUrl: "https://www.youtube.com/embed/N49YEqJihU4?autoplay=1",
          video: "assets/videos/showreel.mp4",
          tags: ["#GMA11", "#DocTonDaiChien", "#ChampionshipBelt", "#GodsOfMartialArts"]
        },
        {
          id: "gma-10",
          title: "GMA 10 – THẦN VÕ ĐỘC TÔN CHÍNH THỨC BẮT ĐẦU!",
          client: "GMA - Gods of Martial Arts",
          year: "2024",
          aspect: "16:9 4K Broadcast",
          duration: "Grand Tournament",
          role: "Lead Action Camera Operator",
          gear: "Sony FX3 + Ultra High-Speed Shutter",
          poster: "assets/images/gma10-max.jpg",
          youtubeUrl: "https://www.youtube.com/watch?v=gwkg9YF9SEw&t=13s",
          embedUrl: "https://www.youtube.com/embed/gwkg9YF9SEw?start=13&autoplay=1",
          video: "assets/videos/sample-clip.mp4",
          tags: ["#GMA10", "#ThanVoDocTon", "#ActionSports", "#MMAArena"]
        },
        {
          id: "gma-09",
          title: "GMA 09 | HỔ MANG THƯỢNG THẦN",
          client: "GMA - Gods of Martial Arts",
          year: "2024",
          aspect: "16:9 4K Broadcast",
          duration: "Live Fight Night",
          role: "Cinematographer & Camera Operator",
          gear: "Sony FX3 + Telephoto & Gimbal",
          poster: "assets/images/gma09-max.jpg",
          youtubeUrl: "https://www.youtube.com/watch?v=jJHphREnkrg",
          embedUrl: "https://www.youtube.com/embed/jJHphREnkrg?autoplay=1",
          video: "assets/videos/showreel.mp4",
          tags: ["#GMA09", "#HoMangThuongThan", "#MMA", "#GodsOfMartialArts"]
        },
        {
          id: "gma-08",
          title: "GMA 08 | TRỤ THẦN CHIẾN KỶ",
          client: "GMA - Gods of Martial Arts",
          year: "2024",
          aspect: "16:9 4K Broadcast",
          duration: "Championship Bout",
          role: "Action DP & Live Cam",
          gear: "Sony FX3 Cinema Line + Ronin RS3 Pro",
          poster: "assets/images/gma08-max.jpg",
          youtubeUrl: "https://www.youtube.com/watch?v=9Yq-PLahBIM&t=103s",
          embedUrl: "https://www.youtube.com/embed/9Yq-PLahBIM?start=103&autoplay=1",
          video: "assets/videos/sample-clip.mp4",
          tags: ["#GMA08", "#TruThanChienKy", "#Knockout", "#CombatSports"]
        },
        {
          id: "gma-07",
          title: "GMA 07 | ĐẠI CHIẾN PHONG THẦN",
          client: "GMA - Gods of Martial Arts",
          year: "2024",
          aspect: "16:9 4K Broadcast",
          duration: "Live Highlight & Full Event",
          role: "Lead Action Camera Operator",
          gear: "Sony FX3 + High Speed Shutter",
          poster: "assets/images/gma07-max.jpg",
          youtubeUrl: "https://www.youtube.com/watch?v=qvljb09uw_Y&t=40s",
          embedUrl: "https://www.youtube.com/embed/qvljb09uw_Y?start=40&autoplay=1",
          video: "assets/videos/showreel.mp4",
          tags: ["#GMA07", "#DaiChienPhongThan", "#HighSpeed", "#MMAVietnam"]
        },
        {
          id: "gma-06",
          title: "GMA 06 | THÁCH ĐẤU THẦN VÕ",
          client: "GMA - Gods of Martial Arts",
          year: "2024",
          aspect: "16:9 4K Broadcast",
          duration: "Grand Tournament",
          role: "Cinematographer & Camera Operator",
          gear: "Sony Cinema Line + Telephoto Setup",
          poster: "assets/images/gma06-max.jpg",
          youtubeUrl: "https://www.youtube.com/watch?v=WjI6z74wJmE&t=4007s",
          embedUrl: "https://www.youtube.com/embed/WjI6z74wJmE?start=4007&autoplay=1",
          video: "assets/videos/sample-clip.mp4",
          tags: ["#GMA06", "#ThachDauThanVo", "#MMAChampionship", "#SportsAction"]
        }
      ]
    },
    {
      id: "scene-02",
      number: "CẢNH 02",
      category: "Corporate Events",
      categoryEn: "CORPORATE & CONFERENCES",
      subtitle: "CHUYÊN NGHIỆP • ĐẲNG CẤP • CHỈN CHU TỪNG KHUNG HÌNH",
      description: "Ghi lại những khoảnh khắc trọng đại, tinh tế trong các sự kiện ra mắt thương hiệu, hội nghị quốc tế và dạ tiệc doanh nghiệp cao cấp.",
      projects: [
        {
          id: "corp-1",
          title: "GLOBAL TECH INNOVATION GALA 2024",
          client: "FinTech & AI Summit VN",
          year: "2024",
          aspect: "16:9 Widescreen",
          duration: "02:30",
          role: "Lead Event Videographer & Lead Editor",
          gear: "Multi-cam FX3/A7SIII + Wireless Video Transmitters",
          poster: "assets/images/corporate-poster.jpg",
          video: "assets/videos/showreel.mp4",
          tags: ["#TechConference", "#KeynoteRecap", "#MultiCam", "#CorporateFilm"]
        },
        {
          id: "corp-2",
          title: "HERITAGE LUXURY PRIVATE UNVEILING",
          client: "Aura Motors Vietnam",
          year: "2023",
          aspect: "2.39:1 CinemaScope",
          duration: "01:50",
          role: "Videographer & DaVinci Colorist",
          gear: "Sony FX3 + Prime Cinema Lenses",
          poster: "assets/images/corporate-poster.jpg",
          video: "assets/videos/sample-clip.mp4",
          tags: ["#BrandLaunch", "#LuxuryEvent", "#MoodyLighting", "#HighEnd"]
        }
      ]
    },
    {
      id: "scene-03",
      number: "CẢNH 03",
      category: "Content Creation",
      categoryEn: "SHORT-FORM & VIRAL REELS",
      subtitle: "ĐỊNH DẠNG DỌC 9:16 • TỐI ƯU TIKTOK & REELS • GIỮ CHÂN NGƯỜI XEM",
      description: "Thiết kế chuyên biệt cho thế hệ nội dung số: Hook hình ảnh trong 2 giây đầu, nhịp dựng theo beat nhạc, màu sắc bắt mắt và thu hút tương tác.",
      projects: [
        {
          id: "reel-1",
          title: "SAIGON NIGHTS: CYPHER STREETWEAR",
          client: "Cypher Studio Saigon",
          year: "2024",
          aspect: "9:16 Vertical",
          duration: "00:45",
          metrics: "1.8M Views • 142K Likes",
          role: "Directing, Shooting & Fast-Cut Edit",
          poster: "assets/images/reel-fashion.jpg",
          video: "assets/videos/showreel.mp4",
          tags: ["#TikTokViral", "#StreetwearFashion", "#FastCuts", "#NeonAesthetic"]
        },
        {
          id: "reel-2",
          title: "SPECIALTY COFFEE SENSORY - TRANG BARISTA",
          client: "Saigon Soul Roastery Cafe",
          year: "2024",
          aspect: "9:16 Vertical",
          duration: "00:35",
          metrics: "890K Views • 65K Saves",
          role: "Solo Creator & Sound Designer",
          poster: "assets/images/reel-culinary.jpg",
          video: "assets/videos/sample-clip.mp4",
          tags: ["#CafeVibes", "#MacroShots", "#CoffeeAesthetic", "#SensoryVideo"]
        }
      ]
    }
  ]
};
