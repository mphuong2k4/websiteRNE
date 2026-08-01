export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface ArticleSource {
  label: string;
  url: string;
}

export interface Article {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  author: string;
  introduction: string;
  sections: ArticleSection[];
  faq: ArticleFaq[];
  sources: ArticleSource[];
}

export const CATEGORIES = ['Tất cả', 'Trường và ngành', 'Học phí và học bổng', 'Internship và career path', 'Tình nguyện và trải nghiệm quốc tế', 'Đời sống tại Thái Lan', 'ROI trong giáo dục'] as const;
export type Category = (typeof CATEGORIES)[number];

export const ARTICLES: Article[] = [
  {
    slug: 'chon-truong-dai-hoc-thai-lan-theo-nganh',
    title: 'Chọn trường đại học Thái Lan theo ngành: 5 tiêu chí quan trọng',
    seoTitle: 'Chọn trường đại học Thái Lan theo ngành: 5 tiêu chí | RNE',
    metaDescription: 'Hướng dẫn chọn trường đại học Thái Lan theo ngành, học phí, vị trí, chuẩn đầu ra và cơ hội nghề nghiệp dành cho sinh viên Việt Nam.',
    keywords: ['chọn trường đại học Thái Lan', 'du học Thái Lan theo ngành', 'đại học quốc tế Thái Lan'],
    category: 'Trường và ngành',
    excerpt: 'Một trường phù hợp cần khớp với ngành học, ngân sách, năng lực đầu vào và mục tiêu nghề nghiệp — không chỉ có thứ hạng cao.',
    image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1600',
    imageAlt: 'Khuôn viên đại học dành cho sinh viên quốc tế tại Thái Lan',
    publishedAt: '2026-06-12', updatedAt: '2026-08-01', readingTime: '8 phút', author: 'Đội ngũ Right Now Education',
    introduction: 'Danh tiếng là một dữ liệu tham khảo, nhưng “trường tốt nhất” chưa chắc là trường phù hợp nhất. Quyết định đúng nên bắt đầu từ ngành học và đích đến sau tốt nghiệp, sau đó mới thu hẹp theo chi phí, môi trường và điều kiện tuyển sinh.',
    sections: [
      { heading: '1. Bắt đầu từ ngành học và chuẩn đầu ra', paragraphs: ['Đọc chương trình học chính thức thay vì chỉ nhìn tên ngành. Hai chương trình cùng tên có thể khác lớn về tỷ lệ lý thuyết, dự án, thực tập và các môn tự chọn. Hãy đối chiếu từng học phần với vị trí công việc bạn muốn theo đuổi.'], bullets: ['Ngôn ngữ giảng dạy và yêu cầu tiếng Anh', 'Môn nền tảng, chuyên sâu và lựa chọn', 'Capstone, phòng lab, dự án doanh nghiệp hoặc thực tập', 'Kiểm định và điều kiện hành nghề nếu ngành có quy định riêng'] },
      { heading: '2. Tính tổng chi phí, không chỉ học phí', paragraphs: ['Ngân sách cần bao gồm học phí toàn khóa, phí ghi danh, bảo hiểm, visa, chỗ ở, đi lại, thiết bị học tập và quỹ dự phòng. So sánh theo tổng chi phí đến lúc tốt nghiệp giúp tránh chọn một chương trình học phí thấp nhưng chi phí sinh hoạt quá cao.'] },
      { heading: '3. Đánh giá vị trí và môi trường sống', paragraphs: ['Bangkok có mạng lưới doanh nghiệp và hoạt động phong phú; các tỉnh khác có thể yên tĩnh và tiết kiệm hơn. Hãy xem thời gian đi từ chỗ ở đến trường, khả năng tiếp cận giao thông công cộng, dịch vụ y tế và cộng đồng sinh viên quốc tế.'] },
      { heading: '4. Kiểm tra điều kiện tuyển sinh từ nguồn chính thức', paragraphs: ['Lập bảng cho từng trường gồm kỳ nhập học, hạn nộp, bằng cấp, điểm tiếng Anh, bài thi, portfolio, phỏng vấn và phí hồ sơ. Điều kiện có thể thay đổi theo chương trình và kỳ tuyển sinh, vì vậy luôn kiểm tra lại trên trang admissions trước khi nộp.'] },
      { heading: '5. Chấm điểm cơ hội phát triển nghề nghiệp', paragraphs: ['Tìm bằng chứng cụ thể: đối tác doanh nghiệp, dịch vụ hướng nghiệp, mạng lưới cựu sinh viên, học kỳ trao đổi và kết quả đầu ra. Sau đó chấm mỗi lựa chọn theo cùng một thang điểm để giảm quyết định cảm tính.'], bullets: ['40%: mức độ phù hợp ngành và nghề nghiệp', '25%: tổng chi phí và khả năng tài chính', '20%: điều kiện đầu vào và xác suất trúng tuyển', '15%: môi trường sống và hỗ trợ sinh viên'] },
    ],
    faq: [
      { question: 'Có nên chọn trường chỉ dựa trên bảng xếp hạng?', answer: 'Không. Xếp hạng nên là một tín hiệu tham khảo. Mức độ phù hợp của chương trình, ngân sách, đầu ra và trải nghiệm học tập mới là các tiêu chí quyết định.' },
      { question: 'Nên chọn bao nhiêu trường để nộp hồ sơ?', answer: 'Bạn có thể xây danh sách cân bằng gồm lựa chọn tham vọng, phù hợp và an toàn; số lượng cụ thể phụ thuộc thời gian, ngân sách và chất lượng từng bộ hồ sơ.' },
    ],
    sources: [
      { label: 'Chulalongkorn University – International Admissions', url: 'https://www.inter.chula.ac.th/international-students/admissions/' },
      { label: 'Chulalongkorn University – International Students', url: 'https://www.chula.ac.th/en/international-students/' },
    ],
  },
  {
    slug: 'hoc-bong-thai-lan-2026',
    title: 'Học bổng Thái Lan 2026: điều kiện và chiến lược ứng tuyển',
    seoTitle: 'Học bổng Thái Lan 2026: Điều kiện, hồ sơ, cách săn | RNE',
    metaDescription: 'Tìm hiểu các loại học bổng Thái Lan 2026, điều kiện, hồ sơ, timeline và chiến lược tăng cơ hội cho sinh viên quốc tế.',
    keywords: ['học bổng Thái Lan 2026', 'săn học bổng Thái Lan', 'du học Thái Lan học bổng'],
    category: 'Học phí và học bổng',
    excerpt: 'Phân biệt đúng loại học bổng, đọc kỹ phạm vi hỗ trợ và chuẩn bị hồ sơ có chiến lược thay vì nộp đại trà.',
    image: 'https://images.pexels.com/photos/256531/pexels-photo-256531.jpeg?auto=compress&cs=tinysrgb&w=1600',
    imageAlt: 'Sinh viên tìm kiếm học bổng du học Thái Lan năm 2026',
    publishedAt: '2026-05-28', updatedAt: '2026-08-01', readingTime: '9 phút', author: 'Đội ngũ Right Now Education',
    introduction: '“Học bổng” có thể là miễn toàn bộ học phí, giảm một phần, hỗ trợ sinh hoạt hoặc tài trợ nghiên cứu. Vì quyền lợi và điều kiện duy trì khác nhau, bước đầu tiên không phải viết bài luận mà là đọc kỹ thông báo chính thức của đúng chương trình.',
    sections: [
      { heading: 'Các nhóm học bổng thường gặp', paragraphs: ['Trường và khoa có thể cấp học bổng đầu vào theo thành tích; một số chương trình có hỗ trợ riêng cho sinh viên quốc tế hoặc nghiên cứu sau đại học. Có suất chỉ giảm học phí, có suất kèm trợ cấp nhưng yêu cầu duy trì kết quả học tập.'], bullets: ['Miễn hoặc giảm học phí', 'Hỗ trợ sinh hoạt, chỗ ở hoặc vé máy bay', 'Trợ lý nghiên cứu/giảng dạy ở bậc sau đại học', 'Hỗ trợ trao đổi và dự án ngắn hạn'] },
      { heading: 'Đọc điều kiện bằng bảng kiểm', paragraphs: ['Ghi rõ quốc tịch, bậc học, ngành, GPA, chứng chỉ tiếng Anh, tuổi, kinh nghiệm và điều kiện duy trì. Đừng suy luận từ học bổng năm trước: tên gọi, hạn nộp và quyền lợi có thể đổi ở mỗi đợt.'] },
      { heading: 'Timeline chuẩn bị hồ sơ', paragraphs: ['Bắt đầu sớm để có thời gian thi lại chứng chỉ, xin thư giới thiệu và chỉnh bài luận. Một lịch thực tế gồm: nghiên cứu và lập shortlist; hoàn thiện CV/portfolio; viết bài luận; kiểm tra hồ sơ; nộp và chuẩn bị phỏng vấn.'] },
      { heading: 'Bài luận cần trả lời ba câu hỏi', paragraphs: ['Hội đồng cần thấy bạn đã làm gì, vì sao chương trình này phù hợp và bạn sẽ tạo giá trị gì sau khi học. Dùng tình huống thật, kết quả đo được và kế hoạch cụ thể; tránh lời khen chung chung về trường hoặc sao chép một bài luận cho mọi nơi.'] },
      { heading: 'Cách tránh học bổng không đáng tin', paragraphs: ['Chỉ xác nhận thông tin trên website chính thức của trường hoặc tổ chức cấp học bổng. Kiểm tra email theo tên miền, điều khoản tài chính và kênh liên hệ. Cảnh giác với cam kết “đậu chắc”, yêu cầu chuyển tiền vào tài khoản cá nhân hoặc thúc ép nộp phí bất thường.'] },
    ],
    faq: [
      { question: 'Có cần được nhận vào trường trước khi xin học bổng?', answer: 'Tùy chương trình. Có học bổng xét cùng hồ sơ nhập học, có học bổng yêu cầu thư mời trước. Thông báo chính thức sẽ nêu rõ thứ tự.' },
      { question: 'GPA chưa nổi bật có còn cơ hội không?', answer: 'Có thể, nếu tiêu chí đánh giá toàn diện. Portfolio, kinh nghiệm, bài luận và mức độ phù hợp có thể tạo khác biệt, nhưng vẫn phải đáp ứng ngưỡng tối thiểu.' },
    ],
    sources: [
      { label: 'Chulalongkorn EBA – Admissions and Scholarships', url: 'https://www.eba.econ.chula.ac.th/admissions-and-scholarships/' },
      { label: 'Chulalongkorn BBA – International Students', url: 'https://bba.acc.chula.ac.th/international-students' },
      { label: 'Chulalongkorn University – Scholarship News', url: 'https://www.chula.ac.th/en/news/298837/' },
    ],
  },
  {
    slug: 'internship-thai-lan-co-luong-khong',
    title: 'Internship tại Thái Lan có lương không? Cách chọn chương trình phù hợp',
    seoTitle: 'Internship tại Thái Lan có lương không? Hướng dẫn 2026 | RNE',
    metaDescription: 'Giải đáp internship tại Thái Lan có lương không, cách đánh giá công việc, quyền lợi, hồ sơ và lưu ý visa, giấy phép lao động.',
    keywords: ['internship tại Thái Lan', 'thực tập Thái Lan có lương', 'thực tập quốc tế'],
    category: 'Internship và career path',
    excerpt: 'Khoản trợ cấp chỉ là một phần; nội dung công việc, người hướng dẫn và tính hợp pháp mới quyết định giá trị kỳ thực tập.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600',
    imageAlt: 'Nhóm thực tập sinh quốc tế trao đổi công việc tại văn phòng ở Thái Lan',
    publishedAt: '2026-05-10', updatedAt: '2026-08-01', readingTime: '8 phút', author: 'Đội ngũ Right Now Education',
    introduction: 'Internship tại Thái Lan có thể có lương, có trợ cấp chi phí hoặc không lương. Không có một mức chung cho mọi ngành và doanh nghiệp. Thay vì chỉ hỏi “được bao nhiêu”, hãy đánh giá toàn bộ gói trải nghiệm và các nghĩa vụ pháp lý trước khi đồng ý.',
    sections: [
      { heading: 'Ba mô hình quyền lợi phổ biến', paragraphs: ['Chương trình có lương trả theo thời gian hoặc đầu việc; chương trình trợ cấp hỗ trợ ăn ở, đi lại; chương trình không lương tập trung vào trải nghiệm học tập. Mọi khoản thanh toán, giờ làm và quyền lợi nên xuất hiện trong thư mời hoặc hợp đồng.'] },
      { heading: 'Kiểm tra visa và quyền làm việc trước tiên', paragraphs: ['Tình trạng sinh viên không đồng nghĩa tự động được phép làm việc. Yêu cầu phụ thuộc quốc tịch, loại hoạt động, đơn vị tiếp nhận và thời hạn. Hãy yêu cầu doanh nghiệp/trường xác nhận quy trình và kiểm tra trực tiếp với cơ quan Thái Lan; không bắt đầu công việc khi giấy tờ chưa rõ.'] },
      { heading: 'Một internship tốt phải có cấu trúc', paragraphs: ['Mô tả công việc cần nêu nhiệm vụ, kỹ năng học được, người hướng dẫn, cách phản hồi và sản phẩm đầu ra. Một kỳ thực tập đáng giá cho phép bạn tạo kết quả có thể đưa vào portfolio mà vẫn tôn trọng bảo mật.'], bullets: ['Nhiệm vụ liên quan mục tiêu nghề nghiệp', 'Mentor và lịch phản hồi định kỳ', 'Giờ làm, địa điểm, quyền lợi minh bạch', 'Tiêu chí đánh giá và giấy xác nhận cuối kỳ'] },
      { heading: 'Hồ sơ ứng tuyển gọn nhưng có bằng chứng', paragraphs: ['CV một trang nên ưu tiên dự án và kết quả; portfolio chỉ giữ các sản phẩm liên quan; email ứng tuyển nói rõ giá trị bạn có thể đóng góp. Chuẩn bị câu chuyện phỏng vấn theo mô hình bối cảnh – hành động – kết quả.'] },
      { heading: 'Nhận diện tín hiệu rủi ro', paragraphs: ['Dừng lại nếu đơn vị không có pháp nhân hoặc địa chỉ rõ ràng, yêu cầu phí lớn nhưng không giải thích dịch vụ, né tránh hợp đồng, giữ hộ chiếu hoặc hứa hỗ trợ giấy tờ không minh bạch. Hãy xác minh độc lập trước khi thanh toán.'] },
    ],
    faq: [
      { question: 'Internship không lương có đáng tham gia?', answer: 'Có thể đáng nếu nhiệm vụ có chiều sâu, mentor tốt, chi phí phù hợp và đầu ra rõ. Không nên tham gia chỉ để có một chứng nhận.' },
      { question: 'Sinh viên quốc tế có cần giấy phép lao động?', answer: 'Có thể cần tùy trường hợp. Quy định pháp lý thay đổi theo loại visa và hoạt động; hãy xác nhận với đơn vị tiếp nhận và cơ quan có thẩm quyền của Thái Lan.' },
    ],
    sources: [
      { label: 'Thailand.go.th – Eligibility of Foreigners to Work in Thailand', url: 'https://thailand.go.th/useful-information-detail/007-007?hl=en' },
      { label: 'Thailand.go.th – Student Visa Information', url: 'https://www.thailand.go.th/visit-thailand-detail/008_005' },
      { label: 'Thailand.go.th – e-WorkPermit', url: 'https://www.thailand.go.th/issue-focus-detail/--e-workpermit--24---?hl=en' },
    ],
  },
  {
    slug: 'tinh-nguyen-quoc-te-thai-lan',
    title: 'Tình nguyện tại Thái Lan: chọn dự án có trách nhiệm và tạo giá trị thật',
    seoTitle: 'Tình nguyện tại Thái Lan: Cách chọn dự án uy tín | RNE',
    metaDescription: 'Hướng dẫn chọn dự án tình nguyện tại Thái Lan an toàn, có trách nhiệm và cách ghi lại trải nghiệm thành portfolio có chiều sâu.',
    keywords: ['tình nguyện tại Thái Lan', 'tình nguyện quốc tế', 'dự án cộng đồng Thái Lan'],
    category: 'Tình nguyện và trải nghiệm quốc tế',
    excerpt: 'Một dự án tốt đặt nhu cầu cộng đồng lên trước trải nghiệm của người tham gia, có phạm vi công việc và cơ chế bảo vệ rõ ràng.',
    image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1600',
    imageAlt: 'Các bạn trẻ tham gia hoạt động tình nguyện cộng đồng tại Thái Lan',
    publishedAt: '2026-04-22', updatedAt: '2026-08-01', readingTime: '7 phút', author: 'Đội ngũ Right Now Education',
    introduction: 'Giá trị của tình nguyện quốc tế không nằm ở số ảnh hay chứng nhận, mà ở đóng góp phù hợp với nhu cầu địa phương và năng lực của bạn. Chọn dự án kỹ giúp bảo vệ cộng đồng, chính người tham gia và giá trị lâu dài của trải nghiệm.',
    sections: [
      { heading: 'Bắt đầu bằng nhu cầu của cộng đồng', paragraphs: ['Tổ chức uy tín giải thích vấn đề, đối tượng hưởng lợi, vai trò của người địa phương và cách đo tác động. Tình nguyện viên nên hỗ trợ chứ không thay thế việc làm địa phương hoặc đảm nhận công việc chuyên môn khi chưa đủ năng lực.'] },
      { heading: 'Sáu câu hỏi cần hỏi đơn vị tổ chức', paragraphs: ['Câu trả lời cụ thể quan trọng hơn nội dung quảng cáo đẹp mắt.'], bullets: ['Ai thiết kế và giám sát dự án?', 'Cộng đồng địa phương tham gia ra quyết định thế nào?', 'Phí chương trình được sử dụng vào đâu?', 'Có quy tắc bảo vệ trẻ em và người dễ tổn thương không?', 'Bảo hiểm, an toàn và hỗ trợ khẩn cấp ra sao?', 'Tác động được theo dõi sau khi tình nguyện viên rời đi thế nào?'] },
      { heading: 'Chuẩn bị văn hóa, sức khỏe và giấy tờ', paragraphs: ['Tìm hiểu quy tắc giao tiếp, trang phục và quyền riêng tư trước khi đến. Xác nhận bảo hiểm, tiêm chủng theo tư vấn y tế cá nhân, visa phù hợp và người liên hệ khẩn cấp. Không đăng hình người hưởng lợi nếu chưa có sự đồng ý hợp lệ.'] },
      { heading: 'Biến trải nghiệm thành năng lực', paragraphs: ['Ghi nhật ký về vấn đề, nhiệm vụ, quyết định, phản hồi và kết quả. Khi đưa vào CV, mô tả bằng động từ và bằng chứng: bạn đã phối hợp với ai, cải thiện điều gì, học được kỹ năng nào — không phóng đại “tác động xã hội”.'] },
      { heading: 'Sau dự án: phản tư và duy trì đóng góp', paragraphs: ['Xin phản hồi từ người hướng dẫn, bàn giao tài liệu và giữ liên hệ đúng cam kết. Một bài phản tư trung thực về giới hạn, bài học liên văn hóa và bước tiếp theo có giá trị hơn danh sách hoạt động dài.'] },
    ],
    faq: [
      { question: 'Có nên tham gia dự án làm việc trực tiếp với trẻ em?', answer: 'Chỉ khi tổ chức có chính sách bảo vệ nghiêm ngặt, sàng lọc người tham gia và vai trò phù hợp chuyên môn. Tránh các hoạt động ngắn hạn tạo gắn bó rồi gián đoạn.' },
      { question: 'Phải trả phí có phải là lừa đảo?', answer: 'Không nhất thiết. Phí có thể chi cho chỗ ở, đào tạo và điều phối, nhưng đơn vị phải minh bạch khoản chi, hoàn tiền và tác động cộng đồng.' },
    ],
    sources: [
      { label: 'United Nations Volunteers – Volunteerism', url: 'https://www.unv.org/volunteerism' },
      { label: 'UNICEF – Safeguarding', url: 'https://www.unicef.org/safeguarding' },
    ],
  },
  {
    slug: 'song-o-bangkok-sinh-vien',
    title: 'Sống ở Bangkok cho sinh viên: nhà ở, đi lại và quản lý chi phí',
    seoTitle: 'Sống ở Bangkok cho sinh viên: Chi phí và kinh nghiệm | RNE',
    metaDescription: 'Kinh nghiệm sống ở Bangkok cho sinh viên quốc tế: chọn nhà, đi BTS/MRT, quản lý ngân sách, sức khỏe và checklist 30 ngày đầu.',
    keywords: ['sống ở Bangkok cho sinh viên', 'chi phí sinh hoạt Bangkok', 'du học Bangkok'],
    category: 'Đời sống tại Thái Lan',
    excerpt: 'Thiết kế ngân sách theo lối sống, chọn nhà dựa trên tổng thời gian di chuyển và chuẩn bị checklist cho 30 ngày đầu.',
    image: 'https://images.pexels.com/photos/1031659/pexels-photo-1031659.jpeg?auto=compress&cs=tinysrgb&w=1600',
    imageAlt: 'Toàn cảnh Bangkok nơi sinh viên quốc tế học tập và sinh sống',
    publishedAt: '2026-04-05', updatedAt: '2026-08-01', readingTime: '8 phút', author: 'Đội ngũ Right Now Education',
    introduction: 'Bangkok có nhiều mức sống khác nhau nên một con số chi phí trung bình hiếm khi đúng với tất cả. Cách lập kế hoạch tốt hơn là chia ngân sách thành nhóm bắt buộc, linh hoạt và dự phòng rồi kiểm tra bằng giá thực tế quanh trường.',
    sections: [
      { heading: 'Lập ngân sách theo ba lớp', paragraphs: ['Lớp bắt buộc gồm nhà, điện nước, học tập, visa và bảo hiểm; lớp linh hoạt gồm ăn uống, di chuyển, giải trí; lớp dự phòng dành cho y tế, vé về nước và biến động tỷ giá. Theo dõi chi tiêu trong tháng đầu trước khi cam kết hợp đồng dài.'] },
      { heading: 'Chọn nhà bằng tổng chi phí di chuyển', paragraphs: ['Giá thuê thấp chưa chắc tiết kiệm nếu phải đổi nhiều chặng hoặc đi taxi thường xuyên. Kiểm tra quãng đường vào giờ cao điểm, khoảng cách đi bộ, mức ngập, điều khoản đặt cọc, phí điện nước và nội thất có sẵn. Không chuyển tiền trước khi xác minh chủ nhà và hợp đồng.'] },
      { heading: 'Dùng BTS và MRT hiệu quả', paragraphs: ['Ưu tiên nhà gần tuyến nối với trường hoặc shuttle bus. Sử dụng bản đồ và ứng dụng chính thức để kiểm tra tuyến, giờ hoạt động, thông báo dịch vụ và giá vé hiện hành; đừng dựa vào blog cũ vì mạng lưới và biểu phí có thể thay đổi.'] },
      { heading: 'Ăn uống, sức khỏe và nhịp sống', paragraphs: ['Kết hợp căn-tin, quán địa phương và tự nấu để kiểm soát ngân sách. Lưu địa chỉ bệnh viện/phòng khám trong mạng lưới bảo hiểm, uống đủ nước và chú ý chất lượng không khí. Tôn trọng văn hóa địa phương, học các câu tiếng Thái cơ bản và hỏi trước khi chụp ảnh người khác.'] },
      { heading: 'Checklist 30 ngày đầu', paragraphs: ['Hoàn thiện thủ tục của trường và nhập cư đúng hạn; đăng ký SIM, tài khoản thanh toán phù hợp; lưu số khẩn cấp; thử tuyến đi học; tham gia orientation và câu lạc bộ. Xây một nhóm hỗ trợ nhỏ gồm bạn học, cố vấn và đầu mối quốc tế của trường.'] },
    ],
    faq: [
      { question: 'Nên ở ký túc xá hay thuê căn hộ?', answer: 'Ký túc xá thường thuận tiện cho giai đoạn đầu; căn hộ cho nhiều lựa chọn hơn nhưng cần tự xử lý hợp đồng và tiện ích. Hãy so sánh tổng chi phí và thời gian đi lại.' },
      { question: 'Có cần biết tiếng Thái không?', answer: 'Không phải mọi chương trình đều yêu cầu, nhưng tiếng Thái cơ bản giúp sinh hoạt, xử lý tình huống và kết nối cộng đồng tốt hơn.' },
    ],
    sources: [
      { label: 'Bangkok Expressway and Metro – MRT Official', url: 'https://metro.bemplc.co.th/?lang=en' },
      { label: 'BTS Skytrain – Official Website', url: 'https://www.bts.co.th/eng/' },
      { label: 'Thailand.go.th – Student Visa Information', url: 'https://www.thailand.go.th/visit-thailand-detail/008_005' },
    ],
  },
  {
    slug: 'roi-du-hoc-thai-lan',
    title: 'ROI du học Thái Lan: cách tính một khoản đầu tư giáo dục đáng giá',
    seoTitle: 'ROI du học Thái Lan: Cách tính chi phí và lợi ích | RNE',
    metaDescription: 'Hướng dẫn tính ROI du học Thái Lan từ tổng chi phí, thu nhập kỳ vọng, kỹ năng, mạng lưới và rủi ro để ra quyết định thực tế.',
    keywords: ['ROI du học Thái Lan', 'chi phí du học Thái Lan', 'đầu tư giáo dục'],
    category: 'ROI trong giáo dục',
    excerpt: 'ROI giáo dục không chỉ là lương: hãy đặt tổng chi phí, cơ hội nghề nghiệp, kỹ năng và rủi ro vào cùng một mô hình.',
    image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1600',
    imageAlt: 'Sinh viên phân tích lợi tức đầu tư của kế hoạch du học Thái Lan',
    publishedAt: '2026-03-18', updatedAt: '2026-08-01', readingTime: '10 phút', author: 'Đội ngũ Right Now Education',
    introduction: 'Một chương trình “rẻ” vẫn có thể có ROI thấp nếu không tạo năng lực phù hợp; chương trình học phí cao có thể đáng giá nếu mở ra đầu ra tốt và nằm trong khả năng tài chính. Vì tương lai bất định, ROI nên được tính theo nhiều kịch bản thay vì một con số quảng cáo.',
    sections: [
      { heading: 'Xác định tổng vốn đầu tư', paragraphs: ['Cộng học phí, phí trường, sinh hoạt, bảo hiểm, visa, vé máy bay, thiết bị và chi phí vốn. Thêm “chi phí cơ hội”: thu nhập hoặc kinh nghiệm bạn có thể nhận nếu đi làm thay vì học. Mọi khoản cần cùng đơn vị tiền tệ và có dự phòng tỷ giá.'] },
      { heading: 'Đo lợi ích tài chính đúng cách', paragraphs: ['So sánh thu nhập sau tốt nghiệp với phương án thay thế phù hợp, không so với số 0. Ước lượng xác suất có việc, thời gian tìm việc và tốc độ tăng lương theo ba kịch bản: thận trọng, cơ sở và tích cực. Dữ liệu quốc tế cho thấy lợi ích của giáo dục đại học khác nhau theo quốc gia, ngành, giới và nhu cầu kỹ năng; không nên áp một mức trung bình cho cá nhân.'] },
      { heading: 'Đừng bỏ qua lợi ích phi tài chính', paragraphs: ['Ngoại ngữ, năng lực liên văn hóa, mạng lưới, sự tự lập và quyền tiếp cận hệ sinh thái nghề nghiệp có thể tạo giá trị dài hạn. Chuyển chúng thành chỉ báo đo được như chứng chỉ, dự án, mentor, phỏng vấn hoặc cơ hội việc làm.'] },
      { heading: 'Công thức và thời gian hoàn vốn', paragraphs: ['Một cách đơn giản: ROI = (lợi ích tài chính tăng thêm – tổng chi phí) / tổng chi phí. Thời gian hoàn vốn là số năm cần để thu nhập tăng thêm bù chi phí. Đây chỉ là mô hình quyết định, không phải cam kết lợi nhuận; cần điều chỉnh lạm phát, thuế và rủi ro nếu tính dài hạn.'] },
      { heading: 'Bảng chấm điểm trước khi quyết định', paragraphs: ['Cho mỗi chương trình điểm 1–5 ở bốn nhóm: phù hợp nghề nghiệp, khả năng tài chính, chất lượng cơ hội và mức rủi ro. Loại phương án khiến gia đình phải vay vượt khả năng chi trả dù kịch bản cơ sở trông hấp dẫn.'], bullets: ['Đầu ra nghề nghiệp có bằng chứng', 'Tổng chi phí và nguồn tài chính an toàn', 'Cơ hội thực tập, dự án và mạng lưới', 'Rủi ro visa, tỷ giá, việc làm và kế hoạch dự phòng'] },
    ],
    faq: [
      { question: 'Bao lâu thì du học hoàn vốn?', answer: 'Không có thời gian chung. Kết quả phụ thuộc tổng chi phí, ngành, thị trường việc làm và chênh lệch thu nhập so với phương án không du học.' },
      { question: 'Học bổng có luôn làm ROI cao hơn?', answer: 'Học bổng giảm chi phí nên thường cải thiện mô hình, nhưng vẫn cần đánh giá chất lượng chương trình, điều kiện duy trì và đầu ra.' },
    ],
    sources: [
      { label: 'OECD – Earnings by Educational Attainment', url: 'https://www.oecd.org/en/topics/earnings-by-educational-attainment.html' },
      { label: 'OECD – Education at a Glance 2025', url: 'https://www.oecd.org/en/publications/education-at-a-glance-2025_1c0d9c79-en.html' },
    ],
  },
];
