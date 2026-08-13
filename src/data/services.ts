export interface Service {
  id: number;
  title: string;
  short: string;
  color: 'blue' | 'yellow' | 'orange' | 'pink' | 'green';
  icon: string;
}

export const SERVICES: Service[] = [
  {
    id: 1,
    title: 'Tư vấn trường, ngành và hồ sơ nhập học',
    short:
      'Phân tích mục tiêu, ngân sách và định hướng nghề nghiệp để lựa chọn trường, ngành phù hợp; sau đó hỗ trợ chuẩn bị, kiểm tra và quản lý hồ sơ nhập học.',
    color: 'blue',
    icon: 'school',
  },
  {
    id: 2,
    title: 'Chiến lược học bổng',
    short:
      'Đánh giá khả năng cạnh tranh, xác định học bổng phù hợp và xây dựng chiến lược dựa trên học lực, hoạt động, kinh nghiệm và mục tiêu của ứng viên.',
    color: 'yellow',
    icon: 'award',
  },
  {
    id: 3,
    title: 'Internship tại Thái Lan từ 3–12 tháng',
    short:
      'Dành cho người muốn tích lũy trải nghiệm làm việc thực tế, khám phá định hướng nghề nghiệp và xây dựng hồ sơ cạnh tranh hơn cho du học, học bổng hoặc việc làm.',
    color: 'orange',
    icon: 'briefcase',
  },
  {
    id: 4,
    title: 'Dự án tình nguyện và trải nghiệm quốc tế',
    short:
      'Tìm kiếm dự án phù hợp với sở thích, chuyên môn và mục tiêu cá nhân để người tham gia vừa đóng góp cho cộng đồng, vừa phát triển kỹ năng và hiểu biết quốc tế.',
    color: 'green',
    icon: 'heart',
  },
  {
    id: 5,
    title: 'Mentorship xây dựng hồ sơ nghề nghiệp từng năm',
    short:
      'Mentor đồng hành theo từng giai đoạn để xác định mục tiêu, phát triển kỹ năng, lựa chọn hoạt động, xây dựng dự án và tích lũy kinh nghiệm trước khi tốt nghiệp.',
    color: 'pink',
    icon: 'users',
  },
];

export const DISPLAY_SERVICES: Service[] = SERVICES.slice(0, 3).map((service) => {
  if (service.id === 1) return {
    ...service,
    title: 'Tư vấn và nộp hồ sơ nhập học vào các trường Thái Lan',
    short: 'Định hướng trường, ngành và hỗ trợ chuẩn bị, kiểm tra, nộp và theo dõi hồ sơ nhập học tại Thái Lan.',
  };
  if (service.id === 2) return {
    ...service,
    title: 'Tư vấn và hỗ trợ nộp học bổng',
    short: 'Xây dựng chiến lược hồ sơ và hỗ trợ ứng tuyển học bổng cho bậc cử nhân, thạc sĩ và tiến sĩ.',
  };
  return {
    ...service,
    title: 'Kiến tập và thực tập tại Thái Lan',
    short: 'Chương trình kiến tập và thực tập tại Thái Lan với thời lượng từ 1 tuần đến 3 tháng.',
  };
});

export interface ServiceDetail {
  forWho?: string[];
  supports: string[];
  process: string[];
  disclosure?: string[];
}

export const SERVICE_DETAILS: Record<number, ServiceDetail> = {
  1: {
    forWho: [
      'Người chưa biết trường hoặc ngành phù hợp',
      'Người cần cân đối chất lượng và ngân sách',
      'Người muốn nộp vào trường công, trường tư hoặc chương trình quốc tế',
      'Người cần hỗ trợ quản lý hồ sơ nhập học',
    ],
    supports: [
      'Đánh giá học lực, ngoại ngữ và kinh nghiệm',
      'Phân tích mục tiêu học tập và nghề nghiệp',
      'Xây dựng shortlist trường và ngành',
      'So sánh học phí, vị trí, thế mạnh và điều kiện đầu vào',
      'Chuẩn bị và kiểm tra hồ sơ',
      'Theo dõi tiến độ nộp đơn',
      'Hỗ trợ các bước sau khi nhận kết quả',
    ],
    process: [
      'Tiếp nhận thông tin',
      'Đánh giá hồ sơ và ngân sách',
      'Xây dựng shortlist',
      'Thống nhất phương án',
      'Chuẩn bị hồ sơ',
      'Nộp đơn và theo dõi',
      'Hỗ trợ trước khi nhập học',
    ],
  },
  2: {
    supports: [
      'Đánh giá mức độ cạnh tranh',
      'Tìm kiếm và phân loại học bổng',
      'Xây dựng chiến lược ứng tuyển',
      'Lập kế hoạch cải thiện hồ sơ',
      'Hỗ trợ CV, bài luận và tài liệu',
      'Chuẩn bị phỏng vấn',
      'Quản lý thời hạn',
    ],
    process: [
      'Đánh giá hồ sơ',
      'Xác định mục tiêu học bổng',
      'Tìm và phân loại cơ hội',
      'Xây dựng chiến lược',
      'Hoàn thiện hồ sơ',
      'Nộp và phỏng vấn',
      'Theo dõi kết quả và phương án thay thế',
    ],
  },
  3: {
    forWho: [
      'Sinh viên cần kinh nghiệm thực tế',
      'Người mới tốt nghiệp',
      'Người muốn xây dựng hồ sơ du học hoặc học bổng',
      'Người muốn có trải nghiệm làm việc quốc tế',
      'Người muốn khám phá định hướng nghề nghiệp',
    ],
    supports: [
      'Xác định ngành nghề và loại internship',
      'Đánh giá kỹ năng',
      'Hoàn thiện CV và portfolio',
      'Tìm kiếm hoặc kết nối cơ hội',
      'Chuẩn bị phỏng vấn',
      'Kiểm tra điều kiện chương trình',
      'Hướng dẫn chuẩn bị trước khi bắt đầu',
    ],
    process: [
      'Xác định mục tiêu',
      'Đánh giá kỹ năng',
      'Chuẩn hóa CV và portfolio',
      'Tìm kiếm và matching',
      'Ứng tuyển và phỏng vấn',
      'Xác nhận điều kiện',
      'Chuẩn bị và bắt đầu internship',
    ],
    disclosure: [
      'Trạng thái có lương hoặc không lương',
      'Thời lượng chương trình',
      'Yêu cầu ngoại ngữ',
      'Yêu cầu visa và pháp lý',
      'Phí tham gia',
      'Gói dịch vụ bao gồm hỗ trợ tìm việc hay đảm bảo vị trí',
    ],
  },
  4: {
    supports: [
      'Xác định mục tiêu tham gia',
      'Tìm dự án phù hợp',
      'Kiểm tra điều kiện và mức độ uy tín',
      'Hỗ trợ đăng ký',
      'Hướng dẫn tài liệu và logistics',
      'Tổng kết trải nghiệm sau chương trình',
    ],
    process: [
      'Xác định mục tiêu',
      'Tìm kiếm dự án',
      'Kiểm tra điều kiện và chi phí',
      'Chuẩn bị hồ sơ',
      'Hoàn thiện kế hoạch',
      'Tham gia',
      'Tổng kết và cập nhật hồ sơ cá nhân',
    ],
  },
  5: {
    supports: [
      'Đánh giá nền tảng hiện tại',
      'Xác định mục tiêu theo năm',
      'Lập kế hoạch học tập và kỹ năng',
      'Gợi ý hoạt động, dự án, cuộc thi và internship',
      'Hỗ trợ CV và portfolio',
      'Check-in định kỳ',
      'Đánh giá và điều chỉnh lộ trình',
    ],
    process: [
      'Đánh giá profile',
      'Xác định mục tiêu dài hạn',
      'Xây dựng kế hoạch theo năm',
      'Check-in định kỳ',
      'Phát triển kỹ năng và kinh nghiệm',
      'Đánh giá tiến độ',
      'Điều chỉnh kế hoạch',
    ],
  },
};

export const DISPLAY_SERVICE_DETAILS: Record<number, ServiceDetail> = {
  1: {
    forWho: ['Người cần chọn trường hoặc ngành phù hợp', 'Người muốn nộp vào trường công hoặc trường tư tại Thái Lan', 'Người cần hỗ trợ quản lý hồ sơ nhập học'],
    supports: ['Đánh giá học lực, ngoại ngữ và kinh nghiệm', 'Phân tích mục tiêu học tập, nghề nghiệp và ngân sách', 'Xây dựng shortlist trường và ngành', 'So sánh học phí, điều kiện đầu vào và điểm mạnh chương trình', 'Chuẩn bị, kiểm tra, nộp và theo dõi hồ sơ', 'Hỗ trợ các bước trước khi nhập học'],
    process: ['Tiếp nhận thông tin', 'Đánh giá hồ sơ và ngân sách', 'Xây dựng shortlist', 'Thống nhất phương án', 'Hoàn thiện hồ sơ', 'Nộp đơn và theo dõi', 'Chuẩn bị nhập học'],
    disclosure: ['Hỗ trợ nộp hồ sơ miễn phí cho tất cả trường tư tại Thái Lan.', 'Chi phí hỗ trợ nộp vào các trường công lập dao động tùy theo độ khó của hồ sơ.'],
  },
  2: {
    forWho: ['Ứng viên bậc cử nhân, thạc sĩ hoặc tiến sĩ', 'Người muốn tối ưu hồ sơ để tăng khả năng cạnh tranh học bổng'],
    supports: ['Đánh giá mức độ cạnh tranh của hồ sơ', 'Tìm kiếm và phân loại học bổng phù hợp', 'Xây dựng chiến lược ứng tuyển theo từng bậc học', 'Hỗ trợ CV, bài luận, thư giới thiệu và tài liệu liên quan', 'Chuẩn bị phỏng vấn và quản lý thời hạn', 'Theo dõi kết quả và phương án tiếp theo'],
    process: ['Đánh giá hồ sơ', 'Xác định mục tiêu học bổng', 'Tìm cơ hội phù hợp', 'Xây dựng chiến lược', 'Hoàn thiện hồ sơ', 'Nộp và phỏng vấn', 'Theo dõi kết quả'],
    disclosure: ['RNE hỗ trợ nộp học bổng cho bậc cử nhân, thạc sĩ và tiến sĩ.', 'Điều kiện, quyền lợi và thời hạn học bổng được kiểm tra theo từng trường, từng kỳ tuyển sinh.'],
  },
  3: {
    forWho: ['Sinh viên cần trải nghiệm thực tế', 'Người muốn khám phá định hướng nghề nghiệp', 'Người muốn củng cố CV hoặc portfolio'],
    supports: ['Xác định ngành nghề và hình thức kiến tập hoặc thực tập phù hợp', 'Đánh giá kỹ năng, hoàn thiện CV và portfolio', 'Tìm kiếm hoặc kết nối cơ hội phù hợp', 'Chuẩn bị phỏng vấn và kiểm tra điều kiện chương trình', 'Hướng dẫn chuẩn bị trước khi bắt đầu'],
    process: ['Xác định mục tiêu', 'Đánh giá kỹ năng', 'Chuẩn hóa CV và portfolio', 'Tìm kiếm và matching', 'Ứng tuyển', 'Xác nhận điều kiện', 'Bắt đầu chương trình'],
    disclosure: ['Thời lượng chương trình từ 1 tuần đến 3 tháng.', 'RNE sẽ làm rõ nội dung công việc, yêu cầu ngoại ngữ, visa và các điều kiện cần thiết trước khi tham gia.'],
  },
};

export const DISPLAY_FAQ_ITEMS = [
  { q: 'RNE chỉ hỗ trợ Thái Lan hay còn quốc gia khác?', a: 'Thái Lan là thị trường chuyên sâu của RNE. Tùy điều kiện hồ sơ và chương trình, RNE có thể triển khai dịch vụ tương ứng tại Anh, Mỹ, Úc, New Zealand và Singapore.' },
  { q: 'Kiến tập hoặc thực tập có lương không?', a: 'Tùy từng chương trình và đơn vị tiếp nhận. RNE sẽ làm rõ quyền lợi, thời lượng, yêu cầu ngoại ngữ, visa và điều kiện tham gia trước khi bạn quyết định.' },
  { q: 'Người chưa có kinh nghiệm có thể tham gia không?', a: 'Có. RNE hỗ trợ xác định lựa chọn phù hợp với trình độ hiện tại, chuẩn hóa CV và portfolio, đồng thời chuẩn bị cho bước ứng tuyển.' },
  { q: 'RNE có hỗ trợ visa và chuẩn bị trước khi đi không?', a: 'RNE hướng dẫn các bước chuẩn bị cần thiết trước khi khởi hành theo từng dịch vụ và điều kiện thực tế của hồ sơ.' },
];

export const FAQ_ITEMS = [
  {
    q: 'RNE chỉ hỗ trợ Thái Lan hay còn quốc gia khác?',
    a: 'Thái Lan là thị trường chuyên sâu của RNE. Tùy theo điều kiện hồ sơ và tình trạng chương trình, RNE cũng có thể triển khai các dịch vụ tương ứng tại Anh, Mỹ, Úc, New Zealand và Singapore.',
  },
  {
    q: 'RNE có đảm bảo đậu trường hoặc học bổng không?',
    a: 'RNE không cam kết đảm bảo kết quả nhập học hoặc học bổng trừ khi có thỏa thuận bằng văn bản cụ thể. RNE đánh giá trung thực khả năng cạnh tranh và hỗ trợ xây dựng hồ sơ mạnh nhất có thể.',
  },
  {
    q: 'Internship có lương không?',
    a: 'Tùy thuộc vào từng chương trình và đối tác. RNE sẽ làm rõ trạng thái có lương hoặc không lương, thời lượng, yêu cầu ngôn ngữ, visa và phí tham gia trước khi bạn quyết định.',
  },
  {
    q: 'Người chưa có kinh nghiệm có thể tìm internship không?',
    a: 'Có. RNE hỗ trợ người chưa có kinh nghiệm xác định ngành nghề phù hợp, chuẩn hóa CV và portfolio, và tìm kiếm cơ hội internship tương ứng với trình độ hiện tại.',
  },
  {
    q: 'Dự án tình nguyện có chứng nhận không?',
    a: 'Tùy thuộc vào tổ chức chủ trì. RNE kiểm tra điều kiện và mức độ uy tín của dự án trước khi hỗ trợ đăng ký, và làm rõ việc cấp chứng nhận trước khi bạn tham gia.',
  },
  {
    q: 'Mentorship kéo dài bao lâu?',
    a: 'Mentorship được xây dựng theo từng năm học và có thể kéo dài xuyên suốt quá trình học. Tần suất check-in và mục tiêu từng giai đoạn được thống nhất ngay từ đầu.',
  },
  {
    q: 'Phí dịch vụ có bao gồm học phí và phí bên thứ ba không?',
    a: 'Không. Phí dịch vụ chỉ bao gồm phần hỗ trợ của RNE. Học phí, phí ứng tuyển, phí visa và các khoản phí bên thứ ba được thanh toán trực tiếp cho đơn vị phát hành.',
  },
  {
    q: 'RNE có hỗ trợ visa, chỗ ở và chuẩn bị trước khi đi không?',
    a: 'Có. RNE hướng trợ các bước chuẩn bị trước khi khởi hành, bao gồm visa, chỗ ở và các lưu ý thực tế. Chi tiết từng gói dịch vụ được quy định rõ trong hợp đồng.',
  },
];
