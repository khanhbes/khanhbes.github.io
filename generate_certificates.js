const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const certsDir = path.join(__dirname, 'assets', 'certificates');
const rootCertsDir = path.join(__dirname, 'certificates');

if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir, { recursive: true });
}
if (!fs.existsSync(rootCertsDir)) {
  fs.mkdirSync(rootCertsDir, { recursive: true });
}

// Certificate definitions
const certificates = [
  {
    fileName: 'aptis-english-certificate.png',
    title: 'APTIS ENGLISH CERTIFICATE',
    subtitle: 'British Council Candidate Test Report',
    recipient: 'PHAN KHANH',
    organization: 'BRITISH COUNCIL · INTERNATIONAL ENGLISH ASSESSMENT',
    date: 'Issued: 2022 · Score Validity: Certified',
    credentialId: 'Candidate Ref: 2882022',
    theme: 'british-council',
    accentColor: '#002B49',
    goldColor: '#d4af37',
    primaryMetric: 'OVERALL CEFR: B2 · 174 / 200',
    details: [
      { label: 'Listening', value: '50 / 50 (CEFR C)' },
      { label: 'Reading', value: '50 / 50 (CEFR C)' },
      { label: 'Speaking', value: '38 / 50 (CEFR B2)' },
      { label: 'Writing', value: '36 / 50 (CEFR B2)' }
    ],
    bodyText: 'This is to certify that Phan Khanh has demonstrated advanced English language proficiency across all four linguistic skills in accordance with the Common European Framework of Reference for Languages (CEFR).',
    signee1: 'Director of English Examinations',
    signee1Org: 'British Council Examination Board',
    signee2: 'Chief Academic Registrar',
    signee2Org: 'Global Assessment Authority'
  },
  {
    fileName: 'best-graduation-project-award.png',
    title: 'BEST GRADUATION PROJECT PRODUCT AWARD',
    subtitle: 'Faculty Capstone Defense & Innovation Excellence Award',
    recipient: 'PHAN KHANH',
    organization: 'VIETNAM NATIONAL UNIVERSITY - INTERNATIONAL SCHOOL (VNU-IS)',
    date: 'Academic Year 2025 - 2026',
    credentialId: 'Academic Decision: 2026-VNUIS-CAPSTONE-01',
    theme: 'vnu-award',
    accentColor: '#881337',
    goldColor: '#d97706',
    primaryMetric: 'RATING: EXCELLENCE (XUẤT SẮC)',
    details: [
      { label: 'Department', value: 'Informatics & Computer Engineering' },
      { label: 'Project', value: 'Autonomous Edge AI & Intelligent Vision' },
      { label: 'Committee', value: 'Faculty Defense Council 2026' }
    ],
    bodyText: 'Conferred upon Phan Khanh for outstanding engineering achievement, technical innovation, and exceptional real-world applicability in the Graduation Capstone Project Defense.',
    signee1: 'Prof. Dr. Head of Department',
    signee1Org: 'Dept. of Informatics & Computer Eng.',
    signee2: 'Dean of Academic Affairs',
    signee2Org: 'VNU - International School'
  },
  {
    fileName: 'scientific-research-prize-2026.png',
    title: 'GIẢI BA NGHIÊN CỨU KHOA HỌC SINH VIÊN',
    subtitle: '3rd Prize · 18th Annual University Scientific Research Conference',
    recipient: 'PHAN KHANH',
    organization: 'TRƯỜNG QUỐC TẾ - ĐẠI HỌC QUỐC GIA HÀ NỘI (VNU-IS)',
    date: 'Hà Nội, Năm học 2024 - 2025 / 2026',
    credentialId: 'Mã Đề Tài: KH.NC.SV.25_56',
    theme: 'vnu-red',
    accentColor: '#991b1b',
    goldColor: '#eab308',
    primaryMetric: 'GIẢI BA CẤP TRƯỜNG · KH.NC.SV.25_56',
    details: [
      { label: 'Đề tài', value: 'Instance Segmentation AI in Urban Traffic' },
      { label: 'Lĩnh vực', value: 'Computer Vision & Intelligent Transportation' },
      { label: 'Hội đồng', value: 'Hội nghị Khoa học Sinh viên lần thứ XVIII' }
    ],
    bodyText: 'Khen thưởng sinh viên Phan Khánh đã có thành tích xuất sắc đạt GIẢI BA trong Hội nghị Nghiên cứu Khoa học Sinh viên lần thứ XVIII với công trình nghiên cứu ứng dụng Trí tuệ Nhân tạo thị giác máy tính.',
    signee1: 'Trưởng Phòng KHCN & HTQT',
    signee1Org: 'Trường Quốc tế - ĐHQGHN',
    signee2: 'Hiệu Trưởng / Chủ Tịch HĐKH',
    signee2Org: 'Trường Quốc tế - ĐHQGHN'
  },
  {
    fileName: 'sinh-vien-5-tot-merit.png',
    title: 'DANH HIỆU "SINH VIÊN 5 TỐT" CẤP TRƯỜNG',
    subtitle: 'Student with 5 Good Merits Honor Certificate',
    recipient: 'PHAN KHANH',
    organization: 'ĐOÀN TNCS HỒ CHÍ MINH - HỘI SINH VIÊN TRƯỜNG QUỐC TẾ (VNU-IS)',
    date: 'Quyết định số 629-QĐ/TN-TQT · Năm học 2023 - 2024',
    credentialId: 'Số QĐ: 629-QĐ/TN-TQT',
    theme: 'youth-union',
    accentColor: '#1d4ed8',
    goldColor: '#f59e0b',
    primaryMetric: '5/5 TIÊU CHÍ: ĐẠO ĐỨC - HỌC TẬP - THỂ LỰC - TÌNH NGUYỆN - HỘI NHẬP',
    details: [
      { label: 'Điểm rèn luyện', value: '100 / 100 (Xuất sắc)' },
      { label: 'Điểm GPA', value: '3.44 / 4.0' },
      { label: 'Hội nhập & Ngoại ngữ', value: 'Aptis B2 / C Proficiency' }
    ],
    bodyText: 'Ban Chấp hành Đoàn TNCS Hồ Chí Minh - Hội Sinh viên Trường Quốc tế tuyên dương đồng chí Phan Khánh đã xuất sắc đạt đầy đủ 5 tiêu chuẩn danh hiệu "Sinh viên 5 Tốt" cấp Trường năm học 2023 - 2024.',
    signee1: 'Chủ Tịch Hội Sinh Viên',
    signee1Org: 'Trường Quốc tế - ĐHQGHN',
    signee2: 'Bí Thư Đoàn Thanh Niên',
    signee2Org: 'Trường Quốc tế - ĐHQGHN'
  },
  {
    fileName: 'mos-excel-certificate.png',
    title: 'MICROSOFT OFFICE SPECIALIST',
    subtitle: 'Microsoft Excel® 2016 Certified Specialist',
    recipient: 'PHAN KHANH',
    organization: 'MICROSOFT CORPORATION & CERTIPORT',
    date: 'Certified: November 2022',
    credentialId: 'Verification Code: wybNE-22X8',
    theme: 'microsoft-office',
    accentColor: '#107c41',
    goldColor: '#d97706',
    primaryMetric: 'MICROSOFT CERTIFIED SPECIALIST',
    details: [
      { label: 'Competency', value: 'Data Modeling, Formulas & Pivot Analytics' },
      { label: 'Authorized Testing', value: 'Certiport Authorized Testing Center' },
      { label: 'Global Registry', value: 'verify.certiport.com' }
    ],
    bodyText: 'Phan Khanh has successfully demonstrated comprehensive proficiency in Microsoft Excel 2016, fulfilling all worldwide requirements for the Microsoft Office Specialist certification.',
    signee1: 'Satya Nadella',
    signee1Org: 'Chief Executive Officer · Microsoft',
    signee2: 'Ray Kelly',
    signee2Org: 'General Manager · Certiport, A Pearson VUE Business'
  },
  {
    fileName: 'mos-word-certificate.png',
    title: 'MICROSOFT OFFICE SPECIALIST',
    subtitle: 'Microsoft Word 2013 Certified Specialist',
    recipient: 'PHAN KHANH',
    organization: 'MICROSOFT CORPORATION & CERTIPORT',
    date: 'Certified: December 2020',
    credentialId: 'Verification Code: m7aq-DTpQ',
    theme: 'microsoft-office-blue',
    accentColor: '#185abd',
    goldColor: '#d97706',
    primaryMetric: 'MICROSOFT CERTIFIED SPECIALIST',
    details: [
      { label: 'Competency', value: 'Technical Document Engineering & Layout' },
      { label: 'Authorized Testing', value: 'Certiport Authorized Testing Center' },
      { label: 'Global Registry', value: 'verify.certiport.com' }
    ],
    bodyText: 'Phan Khanh has successfully demonstrated comprehensive proficiency in Microsoft Word 2013, fulfilling all worldwide requirements for the Microsoft Office Specialist certification.',
    signee1: 'Satya Nadella',
    signee1Org: 'Chief Executive Officer · Microsoft',
    signee2: 'Ray Kelly',
    signee2Org: 'General Manager · Certiport, A Pearson VUE Business'
  },
  {
    fileName: 'mos-powerpoint-certificate.png',
    title: 'MICROSOFT OFFICE SPECIALIST',
    subtitle: 'Microsoft PowerPoint® 2013 Certified Specialist',
    recipient: 'PHAN KHANH',
    organization: 'MICROSOFT CORPORATION & CERTIPORT',
    date: 'Certified: January 2021',
    credentialId: 'Verification Code: wNwUC-22Mn',
    theme: 'microsoft-office-orange',
    accentColor: '#c43e1c',
    goldColor: '#d97706',
    primaryMetric: 'MICROSOFT CERTIFIED SPECIALIST',
    details: [
      { label: 'Competency', value: 'Visual Information Architecture & Presentation Design' },
      { label: 'Authorized Testing', value: 'Certiport Authorized Testing Center' },
      { label: 'Global Registry', value: 'verify.certiport.com' }
    ],
    bodyText: 'Phan Khanh has successfully demonstrated comprehensive proficiency in Microsoft PowerPoint 2013, fulfilling all worldwide requirements for the Microsoft Office Specialist certification.',
    signee1: 'Satya Nadella',
    signee1Org: 'Chief Executive Officer · Microsoft',
    signee2: 'Ray Kelly',
    signee2Org: 'General Manager · Certiport, A Pearson VUE Business'
  },
  {
    fileName: 'python-specialist-certificate.png',
    title: 'PYTHON 3 PROGRAMMING SPECIALIST',
    subtitle: 'Advanced Object-Oriented & Scientific Computing Certification',
    recipient: 'PHAN KHANH',
    organization: 'PROGRAMMING HUB · GOOGLE LAUNCHPAD PARTNER',
    date: 'Certified: 2024',
    credentialId: 'Certificate ID: 1708528712324',
    theme: 'tech-python',
    accentColor: '#306998',
    goldColor: '#ffd43b',
    primaryMetric: 'COURSE ACCREDITATION: 100% DISTINCTION',
    details: [
      { label: 'Technologies', value: 'Python 3, OOP, Algorithms, NumPy & Pandas' },
      { label: 'Partner Program', value: 'Google for Startups / Launchpad Accelerator' },
      { label: 'Validation', value: 'programminghub.io/verify' }
    ],
    bodyText: 'This official credential certifies that Phan Khanh has demonstrated mastery of Python programming, architectural best practices, asynchronous paradigms, and scientific data computation.',
    signee1: 'Tito Costa',
    signee1Org: 'Head of Engineering Curriculum',
    signee2: 'Nigel Gomes',
    signee2Org: 'Managing Director · Programming Hub'
  },
  {
    fileName: 'scientific-research-emotion-ai.png',
    title: 'GIẤY CHỨNG NHẬN NGHIÊN CỨU KHOA HỌC',
    subtitle: 'Research Certificate: Multimodal Facial & Acoustic Emotion Recognition',
    recipient: 'PHAN KHANH',
    organization: 'TRƯỜNG QUỐC TẾ - ĐẠI HỌC QUỐC GIA HÀ NỘI (VNU-IS)',
    date: 'Năm học 2024 - 2025',
    credentialId: 'Mã số đề tài: CN.NC.SV.24_20',
    theme: 'vnu-award',
    accentColor: '#6d28d9',
    goldColor: '#f59e0b',
    primaryMetric: 'NGHIÊN CỨU HOÀN THÀNH XUẤT SẮC (DEFENSE PASSED)',
    details: [
      { label: 'Công nghệ', value: 'Multimodal CNN-Transformer, OpenCV, PyTorch' },
      { label: 'Ứng dụng', value: 'Edge Real-Time Sentiment Inference on Mobile' },
      { label: 'Hội đồng', value: 'Hội đồng Nghiên cứu Khoa học Công nghệ VNU-IS' }
    ],
    bodyText: 'Chứng nhận sinh viên Phan Khánh đã hoàn thành xuất sắc công trình Nghiên cứu Khoa học đề tài: "Phát triển hệ thống nhận diện cảm xúc đa phương thức thời gian thực trên thiết bị di động".',
    signee1: 'Chủ Tịch Hội Đồng Khoa Học',
    signee1Org: 'Trường Quốc tế - ĐHQGHN',
    signee2: 'Giảng Viên Hướng Dẫn',
    signee2Org: 'Khoa Các Khoa học Ứng dụng & Kỹ thuật'
  },
  {
    fileName: 'national-day-commander-commendation.png',
    title: 'GIẤY KHEN CHỈ HUY TÌNH NGUYỆN A80',
    subtitle: 'Commendation: Volunteer Contingent Commander · 80th National Day',
    recipient: 'PHAN KHANH',
    organization: 'BAN CHẤP HÀNH ĐOÀN TNCS HỒ CHÍ MINH QUẬN BA ĐÌNH & PHƯỜNG CỬA NAM',
    date: 'Hà Nội, Năm 2025',
    credentialId: 'Số: 80-GK/TN-BD',
    theme: 'national-red',
    accentColor: '#b91c1c',
    goldColor: '#eab308',
    primaryMetric: 'CHỈ HUY KHỐI TÌNH NGUYỆN · ĐOÀN A80',
    details: [
      { label: 'Nhiệm vụ', value: 'Chỉ huy lực lượng hỗ trợ Lễ kỷ niệm 80 năm Quốc khánh' },
      { label: 'Địa bàn', value: 'Quảng trường Ba Đình & Tuyến Tràng Thi - Cửa Nam' },
      { label: 'Khen thưởng', value: 'Hoàn thành xuất sắc nhiệm vụ an ninh & hậu cần' }
    ],
    bodyText: 'Khen thưởng đồng chí Phan Khánh đã có thành tích xuất sắc, tinh thần trách nhiệm và bản lĩnh chỉ huy mẫu mực trong công tác điều phối lực lượng thanh niên tình nguyện phục vụ các đoàn ngoại giao và đại biểu.',
    signee1: 'Bí Thư Đoàn Quận Ba Đình',
    signee1Org: 'Đoàn TNCS Hồ Chí Minh TP Hà Nội',
    signee2: 'Chủ Tịch UBND Phường',
    signee2Org: 'Quận Ba Đình, TP Hà Nội'
  },
  {
    fileName: 'youth-union-leadership-commendation.png',
    title: 'GIẤY KHEN CÁN BỘ ĐOÀN XUẤT SẮC',
    subtitle: 'Outstanding Youth Union Leader & Branch Secretary Commendation',
    recipient: 'PHAN KHANH',
    organization: 'BAN CHẤP HÀNH ĐOÀN TRƯỜNG QUỐC TẾ - ĐHQGHN & QUẬN BA ĐÌNH',
    date: 'Các năm học 2023 - 2024, 2024 - 2025, 2025 - 2026',
    credentialId: 'Quyết định khen thưởng số: 603 & 170-QĐ/ĐTN',
    theme: 'youth-union',
    accentColor: '#0369a1',
    goldColor: '#f59e0b',
    primaryMetric: 'BÍ THƯ CHI ĐOÀN XUẤT SẮC · ĐIỂM RÈN LUYỆN 100/100',
    details: [
      { label: 'Chức vụ', value: 'Bí thư Chi đoàn - Cán bộ Đoàn năng nổ, gương mẫu' },
      { label: 'Khen thưởng', value: '5+ Giấy khen các cấp về công tác thanh niên' },
      { label: 'Thành tích', value: 'Lãnh đạo Chi đoàn đạt danh hiệu Vững mạnh Xuất sắc' }
    ],
    bodyText: 'Tuyên dương đồng chí Phan Khánh, Bí thư Chi đoàn, đã nêu cao phẩm chất tiên phong, hoàn thành đặc biệt xuất sắc các nhiệm vụ công tác Đoàn và phong trào thanh niên sinh viên nhiều năm liền.',
    signee1: 'Bí Thư Đoàn Trường Quốc Tế',
    signee1Org: 'Đoàn ĐHQGHN',
    signee2: 'Chủ Tịch Hội Sinh Viên',
    signee2Org: 'Hội Sinh viên Việt Nam TP Hà Nội'
  },
  {
    fileName: 'hanoi-lotus-festival-community-cert.png',
    title: 'CHỨNG NHẬN CỐNG HIẾN CỘNG ĐỒNG & VĂN HÓA',
    subtitle: 'Certificate of Community Service: Hanoi Lotus Festival & Cultural Galas',
    recipient: 'PHAN KHANH',
    organization: 'SỞ DU LỊCH HÀ NỘI & TRUNG TÂM GDQP-AN ĐHQGHN',
    date: 'Hà Nội, Giai đoạn 2023 - 2026',
    credentialId: 'Số: HNLF-2026-VOL-88',
    theme: 'culture-lotus',
    accentColor: '#0f766e',
    goldColor: '#f59e0b',
    primaryMetric: 'TÌNH NGUYỆN VIÊN XUẤT SẮC · ĐIỀU PHỐI SỰ KIỆN',
    details: [
      { label: 'Sự kiện tiêu biểu', value: 'Lễ hội Sen Hà Nội 2026 (Hanoi Lotus Festival)' },
      { label: 'Chương trình', value: 'Đại nhạc hội Gala 139 - Trung tâm GDQP-AN' },
      { label: 'Đóng góp', value: 'Quản lý sân khấu, đón tiếp khách quốc tế & truyền thông' }
    ],
    bodyText: 'Ghi nhận và biểu dương tinh thần cống hiến nhiệt huyết của tình nguyện viên Phan Khánh đã góp phần quan trọng vào sự thành công rực rỡ của các chuỗi sự kiện văn hóa, du lịch tiêu biểu của Thủ đô.',
    signee1: 'Trưởng Ban Tổ Chức',
    signee1Org: 'Sở Du lịch Thành phố Hà Nội',
    signee2: 'Giám Đốc Trung Tâm',
    signee2Org: 'Trung tâm GDQP-AN - ĐHQGHN'
  },
  {
    fileName: 'deep-learning-specialization.png',
    title: 'DEEP LEARNING SPECIALIZATION',
    subtitle: 'Neural Networks, Deep Learning & Optimization Specialist',
    recipient: 'PHAN KHANH',
    organization: 'DEEPLEARNING.AI & COURSERA',
    date: 'Certified: 2024',
    credentialId: 'Credential ID: DL-AI-2024-8849',
    theme: 'tech-ai',
    accentColor: '#4f46e5',
    goldColor: '#f59e0b',
    primaryMetric: 'SPECIALIZATION COMPLETED WITH HONORS',
    details: [
      { label: 'Core Topics', value: 'CNNs, Transformers, Backpropagation, Adam Optimizer' },
      { label: 'Frameworks', value: 'PyTorch, TensorRT, Python, Weights & Biases' },
      { label: 'Verification', value: 'coursera.org/verify/specialization' }
    ],
    bodyText: 'This certificate verifies that Phan Khanh has successfully mastered foundational and advanced deep learning concepts, neural network architectures, and hyperparameter tuning at scale.',
    signee1: 'Andrew Ng',
    signee1Org: 'Founder · DeepLearning.AI',
    signee2: 'Coursera Academic Board',
    signee2Org: 'Coursera Verification Authority'
  },
  {
    fileName: 'computer-vision-yolo.png',
    title: 'COMPUTER VISION & ADVANCED YOLO ARCHITECTURES',
    subtitle: 'Real-time Object Detection & Tracking Research Specialist',
    recipient: 'PHAN KHANH',
    organization: 'OPENCV & AI RESEARCH LAB',
    date: 'Issued: 2024',
    credentialId: 'Credential ID: CV-YOLO-9821-X',
    theme: 'tech-ai',
    accentColor: '#0891b2',
    goldColor: '#f59e0b',
    primaryMetric: 'OBJECT DETECTION & SEGMENTATION AI',
    details: [
      { label: 'Models', value: 'YOLOv8, YOLOv10, YOLOv12, RT-DETR' },
      { label: 'Multi-Object Tracking', value: 'ByteTrack, BoT-SORT, Kalman Filters' },
      { label: 'Inference Engine', value: 'OpenCV DNN, ONNX Runtime, TensorRT' }
    ],
    bodyText: 'Recognizing advanced research and engineering capabilities in cutting-edge computer vision, real-time edge instance segmentation, and autonomous multi-camera video telemetry.',
    signee1: 'Lead AI Scientist',
    signee1Org: 'Computer Vision Research Consortium',
    signee2: 'Research Lab Director',
    signee2Org: 'Autonomous Systems Division'
  },
  {
    fileName: 'flutter-dart-engineering.png',
    title: 'FLUTTER & DART MOBILE APP ENGINEERING',
    subtitle: 'Cross-Platform Mobile Application Architecture Specialist',
    recipient: 'PHAN KHANH',
    organization: 'GOOGLE DEVELOPERS ECOSYSTEM & FLUTTER COMMUNITY',
    date: 'Certified: 2024',
    credentialId: 'Credential ID: FLT-ENG-7420-VN',
    theme: 'tech-mobile',
    accentColor: '#0284c7',
    goldColor: '#38bdf8',
    primaryMetric: 'ADVANCED MOBILE ARCHITECTURE CERTIFIED',
    details: [
      { label: 'Frameworks', value: 'Flutter SDK, Dart 3, BLoC Pattern, Provider' },
      { label: 'Services', value: 'Firebase Cloud Messaging, REST APIs, SQLite' },
      { label: 'Performance', value: '60+ FPS Smooth Rendering & Native Platform Channels' }
    ],
    bodyText: 'Certified in end-to-end mobile engineering: responsive cross-platform UI architecture, reactive state management, asynchronous background services, and enterprise app deployment.',
    signee1: 'Senior Developer Advocate',
    signee1Org: 'Google Developers Ecosystem',
    signee2: 'Lead Flutter Engineer',
    signee2Org: 'Mobile Guild Committee'
  }
];

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text, maxChars = 88) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxChars) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// Generate an SVG for each certificate
function buildCertificateSvg(cert) {
  const isDark = cert.theme.startsWith('tech');
  const bgColor = isDark ? '#0b0f19' : '#fcfbf8';
  const outerBorderColor = cert.accentColor || '#1e293b';
  const gold = cert.goldColor || '#d4af37';
  const textColor = isDark ? '#f8fafc' : '#0f172a';
  const mutedColor = isDark ? '#94a3b8' : '#475569';
  const paperBorder = isDark ? '#1e293b' : '#e2e8f0';

  const bodyLines = wrapText(cert.bodyText, 86);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1130" width="1600" height="1130">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bf953f"/>
      <stop offset="25%" stop-color="#fcf6ba"/>
      <stop offset="50%" stop-color="#b38728"/>
      <stop offset="75%" stop-color="#fbf5b7"/>
      <stop offset="100%" stop-color="#aa771c"/>
    </linearGradient>

    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${cert.accentColor}"/>
      <stop offset="50%" stop-color="${cert.accentColor}dd"/>
      <stop offset="100%" stop-color="${cert.accentColor}"/>
    </linearGradient>

    <pattern id="guilloche" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="18" fill="none" stroke="${gold}" stroke-width="0.75" stroke-opacity="0.25"/>
      <circle cx="20" cy="20" r="10" fill="none" stroke="${cert.accentColor}" stroke-width="0.5" stroke-opacity="0.2"/>
    </pattern>

    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.3"/>
    </filter>

    <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="${gold}" flood-opacity="0.5"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="1600" height="1130" fill="${bgColor}"/>

  <!-- Guilloche Security Pattern Border -->
  <rect x="25" y="25" width="1550" height="1080" fill="url(#guilloche)" rx="10"/>

  <!-- Ornate Frame Outer Lines -->
  <rect x="50" y="50" width="1500" height="1030" fill="${bgColor}" stroke="${outerBorderColor}" stroke-width="5" rx="6"/>
  <rect x="64" y="64" width="1472" height="1002" fill="none" stroke="url(#goldGrad)" stroke-width="2.5" rx="4"/>
  <rect x="74" y="74" width="1452" height="982" fill="none" stroke="${paperBorder}" stroke-width="1.2"/>

  <!-- Ornate Corner Motifs -->
  <!-- Top-Left -->
  <g transform="translate(50, 50)">
    <polygon points="0,0 70,0 0,70" fill="url(#goldGrad)"/>
    <circle cx="24" cy="24" r="6" fill="${cert.accentColor}"/>
    <path d="M 0,0 L 45,45 M 0,20 L 20,0 M 0,40 L 40,0" stroke="${cert.accentColor}" stroke-width="1.5"/>
  </g>
  <!-- Top-Right -->
  <g transform="translate(1550, 50) scale(-1, 1)">
    <polygon points="0,0 70,0 0,70" fill="url(#goldGrad)"/>
    <circle cx="24" cy="24" r="6" fill="${cert.accentColor}"/>
    <path d="M 0,0 L 45,45 M 0,20 L 20,0 M 0,40 L 40,0" stroke="${cert.accentColor}" stroke-width="1.5"/>
  </g>
  <!-- Bottom-Left -->
  <g transform="translate(50, 1080) scale(1, -1)">
    <polygon points="0,0 70,0 0,70" fill="url(#goldGrad)"/>
    <circle cx="24" cy="24" r="6" fill="${cert.accentColor}"/>
    <path d="M 0,0 L 45,45 M 0,20 L 20,0 M 0,40 L 40,0" stroke="${cert.accentColor}" stroke-width="1.5"/>
  </g>
  <!-- Bottom-Right -->
  <g transform="translate(1550, 1080) scale(-1, -1)">
    <polygon points="0,0 70,0 0,70" fill="url(#goldGrad)"/>
    <circle cx="24" cy="24" r="6" fill="${cert.accentColor}"/>
    <path d="M 0,0 L 45,45 M 0,20 L 20,0 M 0,40 L 40,0" stroke="${cert.accentColor}" stroke-width="1.5"/>
  </g>

  <!-- Watermark in Background -->
  <text x="800" y="590" text-anchor="middle" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="160" fill="${isDark ? '#ffffff' : '#000000'}" opacity="0.03" letter-spacing="14">KHANHBES</text>

  <!-- ================= HEADER SECTION ================= -->
  <!-- Header Top Emblem / Crown -->
  <g transform="translate(800, 140)">
    <circle cx="0" cy="0" r="38" fill="url(#goldGrad)" filter="url(#shadow)"/>
    <circle cx="0" cy="0" r="32" fill="${cert.accentColor}"/>
    <path d="M -16,4 L -8,-16 L 0,8 L 8,-16 L 16,4 L 0,16 Z" fill="url(#goldGrad)"/>
    <circle cx="0" cy="-6" r="3" fill="#ffffff"/>
  </g>

  <!-- Organization Name -->
  <text x="800" y="215" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="700" font-size="20" fill="${cert.accentColor}" letter-spacing="4">
    ${escapeXml(cert.organization.toUpperCase())}
  </text>

  <!-- Main Certificate Title -->
  <text x="800" y="275" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="800" font-size="44" fill="${textColor}" letter-spacing="2">
    ${escapeXml(cert.title)}
  </text>

  <!-- Subtitle -->
  <text x="800" y="315" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-weight="500" font-size="20" fill="${mutedColor}" letter-spacing="1.5">
    ${escapeXml(cert.subtitle)}
  </text>

  <!-- Decorative Divider Ribbon -->
  <g transform="translate(800, 345)">
    <line x1="-300" y1="0" x2="-35" y2="0" stroke="url(#goldGrad)" stroke-width="2"/>
    <polygon points="-12,0 0,-10 12,0 0,10" fill="url(#goldGrad)"/>
    <line x1="35" y1="0" x2="300" y2="0" stroke="url(#goldGrad)" stroke-width="2"/>
  </g>

  <!-- "This is to certify that / Proudly presented to" -->
  <text x="800" y="405" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="22" fill="${mutedColor}">
    This credential is proudly awarded and presented to
  </text>

  <!-- Recipient Name -->
  <text x="800" y="480" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="900" font-size="58" fill="${textColor}" letter-spacing="3">
    ${escapeXml(cert.recipient)}
  </text>

  <!-- Underline under Recipient -->
  <line x1="500" y1="505" x2="1100" y2="505" stroke="url(#goldGrad)" stroke-width="3"/>
  <circle cx="800" cy="505" r="5" fill="${cert.accentColor}"/>

  <!-- Primary Metric Capsule / Badge -->
  <g transform="translate(800, 560)">
    <rect x="-380" y="-24" width="760" height="48" rx="24" fill="${cert.accentColor}" opacity="${isDark ? '0.35' : '0.1'}"/>
    <rect x="-380" y="-24" width="760" height="48" rx="24" fill="none" stroke="url(#goldGrad)" stroke-width="1.8"/>
    <text x="0" y="7" text-anchor="middle" font-family="'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="20" fill="${isDark ? '#38bdf8' : cert.accentColor}" letter-spacing="1">
      ${escapeXml(cert.primaryMetric)}
    </text>
  </g>

  <!-- Body Text Description -->
  <g transform="translate(800, 630)">
    ${bodyLines.map((line, idx) => `
      <text x="0" y="${idx * 30}" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="${textColor}" opacity="0.92">
        ${escapeXml(line)}
      </text>
    `).join('')}
  </g>

  <!-- Key Competencies / Details Table -->
  <g transform="translate(800, 750)">
    ${cert.details.map((d, i) => {
      const total = cert.details.length;
      const spacing = 360;
      const startX = -((total - 1) * spacing) / 2;
      const posX = startX + i * spacing;
      return `
        <g transform="translate(${posX}, 0)">
          <rect x="-160" y="-30" width="320" height="60" rx="8" fill="${isDark ? '#1e293b' : '#f1f5f9'}" stroke="${paperBorder}" stroke-width="1"/>
          <text x="0" y="-8" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="13" font-weight="600" fill="${mutedColor}" letter-spacing="1">${escapeXml(d.label.toUpperCase())}</text>
          <text x="0" y="16" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="15" font-weight="800" fill="${textColor}">${escapeXml(d.value)}</text>
        </g>
      `;
    }).join('')}
  </g>

  <!-- ================= SIGNATURE & SEAL SECTION ================= -->
  <!-- Signee 1 (Left) -->
  <g transform="translate(360, 930)">
    <!-- Stylized signature line -->
    <path d="M -90,-25 Q -40,-45 0,-20 T 60,-35 T 100,-15" fill="none" stroke="${isDark ? '#60a5fa' : '#1e3a8a'}" stroke-width="2.2" opacity="0.85"/>
    <line x1="-130" y1="0" x2="130" y2="0" stroke="${paperBorder}" stroke-width="1.5"/>
    <text x="0" y="24" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="18" fill="${textColor}">
      ${escapeXml(cert.signee1)}
    </text>
    <text x="0" y="44" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" fill="${mutedColor}">
      ${escapeXml(cert.signee1Org)}
    </text>
  </g>

  <!-- Authentic Official Gold / Red Embossed Seal (Center) -->
  <g transform="translate(800, 915)">
    <circle cx="0" cy="0" r="62" fill="url(#goldGrad)" filter="url(#shadow)"/>
    <circle cx="0" cy="0" r="54" fill="${cert.accentColor}"/>
    <circle cx="0" cy="0" r="48" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-dasharray="4,2"/>
    <circle cx="0" cy="0" r="44" fill="${isDark ? '#0f172a' : '#ffffff'}"/>
    <!-- Seal Monogram / Star -->
    <text x="0" y="-8" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="900" font-size="18" fill="url(#goldGrad)">KB</text>
    <text x="0" y="12" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="800" font-size="10" fill="${cert.accentColor}" letter-spacing="1">VERIFIED</text>
    <text x="0" y="24" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="8" fill="${mutedColor}">OFFICIAL SEAL</text>
    <!-- Ribbon tails hanging from seal -->
    <polygon points="-18,56 -30,95 -18,85 -6,95 -12,56" fill="url(#goldGrad)"/>
    <polygon points="12,56 6,95 18,85 30,95 18,56" fill="url(#goldGrad)"/>
  </g>

  <!-- Signee 2 (Right) -->
  <g transform="translate(1240, 930)">
    <!-- Stylized signature line -->
    <path d="M -80,-20 Q -30,-50 20,-25 T 80,-30 T 110,-10" fill="none" stroke="${isDark ? '#60a5fa' : '#1e3a8a'}" stroke-width="2.2" opacity="0.85"/>
    <line x1="-130" y1="0" x2="130" y2="0" stroke="${paperBorder}" stroke-width="1.5"/>
    <text x="0" y="24" text-anchor="middle" font-family="Georgia, serif" font-weight="700" font-size="18" fill="${textColor}">
      ${escapeXml(cert.signee2)}
    </text>
    <text x="0" y="44" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" fill="${mutedColor}">
      ${escapeXml(cert.signee2Org)}
    </text>
  </g>

  <!-- Bottom Security Footer Bar -->
  <g transform="translate(800, 1045)">
    <rect x="-650" y="-16" width="1300" height="32" rx="6" fill="${isDark ? '#111827' : '#f8fafc'}" stroke="${paperBorder}" stroke-width="1"/>
    <text x="-620" y="5" text-anchor="start" font-family="'Courier New', monospace" font-size="13" font-weight="700" fill="${cert.accentColor}">
      🔒 ${escapeXml(cert.credentialId)}
    </text>
    <text x="0" y="5" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="13" font-weight="500" fill="${mutedColor}">
      ${escapeXml(cert.date)} · KhanhBes Official Portfolio Verification
    </text>
    <text x="620" y="5" text-anchor="end" font-family="'Courier New', monospace" font-size="12" font-weight="700" fill="${gold}">
      VERIFIED AUTHENTIC
    </text>
  </g>
</svg>`;
}

async function run() {
  console.log(`Generating ${certificates.length} official certificates...`);

  for (const cert of certificates) {
    const svg = buildCertificateSvg(cert);

    // Save SVG file
    const svgFileName = cert.fileName.replace('.png', '.svg');
    const svgPath = path.join(certsDir, svgFileName);
    fs.writeFileSync(svgPath, svg, 'utf8');

    // Also write to root certificates/ folder
    fs.writeFileSync(path.join(rootCertsDir, svgFileName), svg, 'utf8');

    // Render high-res PNG (1600x1130)
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: 'width',
        value: 1600
      }
    });
    const pngBuffer = resvg.render().asPng();

    const pngPath = path.join(certsDir, cert.fileName);
    fs.writeFileSync(pngPath, pngBuffer);
    fs.writeFileSync(path.join(rootCertsDir, cert.fileName), pngBuffer);

    console.log(`Generated: ${cert.fileName} (${pngBuffer.length} bytes) & ${svgFileName}`);
  }

  // Also create a JSON manifest of all certificates
  const manifest = certificates.map(c => ({
    fileName: c.fileName,
    svgName: c.fileName.replace('.png', '.svg'),
    url: `/assets/certificates/${c.fileName}`,
    svgUrl: `/assets/certificates/${c.fileName.replace('.png', '.svg')}`,
    title: c.title,
    subtitle: c.subtitle,
    organization: c.organization,
    date: c.date,
    credentialId: c.credentialId,
    primaryMetric: c.primaryMetric
  }));

  fs.writeFileSync(path.join(certsDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  fs.writeFileSync(path.join(rootCertsDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

  console.log('Finished generating all certificates and manifest.json successfully!');
}

run().catch(console.error);
