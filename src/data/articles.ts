export interface Article {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  author: string;
  body: string;
  sources: string[];
}

export const CATEGORIES = [
  'Tất cả',
  'Trường và ngành',
  'Học phí và học bổng',
  'Internship và career path',
  'Tình nguyện và trải nghiệm quốc tế',
  'Đời sống tại Thái Lan',
  'ROI trong giáo dục',
] as const;

export type Category = (typeof CATEGORIES)[number];

export const ARTICLES: Article[] = [
  {
    slug: 'chon-truong-dai-hoc-thai-lan-theo-nganh',
    title: 'Chọn trường đại học Thái Lan theo ngành: 5 điều cần cân nhắc trước khi nộp hồ sơ',
    category: 'Trường và ngành',
    excerpt: 'Không phải trường top đầu lúc nào cũng phù hợp. Bài viết phân tích cách chọn trường theo ngành học, vị trí, học phí và cơ hội nghề nghiệp.',
    image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1200',
    publishedAt: '2026-06-12',
    updatedAt: '2026-07-01',
    readingTime: '6 phút',
    author: 'Đội ngũ Right Now Education',
    body: 'Bài viết đang được hoàn thiện. Nội dung chính thức sẽ được cập nhật bởi đội ngũ biên tập RNE sau khi kiểm chứng nguồn.',
    sources: ['QS World University Rankings 2025', 'Trang web chính thức của các trường'],
  },
  {
    slug: 'hoc-bong-thai-lan-2026',
    title: 'Tổng quan học bổng Thái Lan 2026: cơ hội, điều kiện và chiến lược ứng tuyển',
    category: 'Học phí và học bổng',
    excerpt: 'Các loại học bổng phổ biến tại Thái Lan dành cho sinh viên quốc tế, điều kiện cạnh tranh và cách xây dựng chiến lược ứng tuyển.',
    image: 'https://images.pexels.com/photos/256531/pexels-photo-256531.jpeg?auto=compress&cs=tinysrgb&w=1200',
    publishedAt: '2026-05-28',
    updatedAt: '2026-06-20',
    readingTime: '8 phút',
    author: 'Đội ngũ Right Now Education',
    body: 'Bài viết đang được hoàn thiện. Nội dung chính thức sẽ được cập nhật bởi đội ngũ biên tập RNE sau khi kiểm chứng nguồn.',
    sources: ['Cổng thông tin học bổng các trường', 'QS Rankings 2025'],
  },
  {
    slug: 'internship-thai-lan-co-luong-khong',
    title: 'Internship tại Thái Lan: có lương hay không, và làm sao để chọn chương trình phù hợp?',
    category: 'Internship và career path',
    excerpt: 'Phân loại internship tại Thái Lan, điều kiện tham gia, và cách đánh giá giá trị thực tế của một kỳ internship đối với lộ trình nghề nghiệp.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
    publishedAt: '2026-05-10',
    updatedAt: '2026-06-02',
    readingTime: '7 phút',
    author: 'Đội ngũ Right Now Education',
    body: 'Bài viết đang được hoàn thiện. Nội dung chính thức sẽ được cập nhật bởi đội ngũ biên tập RNE sau khi kiểm chứng nguồn.',
    sources: ['Thông tin chương trình từ các đối tác', 'Cổng lao động Thái Lan'],
  },
  {
    slug: 'tinh-nguyen-quoc-te-thai-lan',
    title: 'Dự án tình nguyện tại Thái Lan: đóng góp cộng đồng và xây dựng hồ sơ cá nhân',
    category: 'Tình nguyện và trải nghiệm quốc tế',
    excerpt: 'Các dự án tình nguyện phù hợp với sinh viên quốc tế, cách chọn dự án uy tín và biến trải nghiệm thành điểm mạnh trong hồ sơ.',
    image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1200',
    publishedAt: '2026-04-22',
    updatedAt: '2026-05-15',
    readingTime: '5 phút',
    author: 'Đội ngũ Right Now Education',
    body: 'Bài viết đang được hoàn thiện. Nội dung chính thức sẽ được cập nhật bởi đội ngũ biên tập RNE sau khi kiểm chứng nguồn.',
    sources: ['Trang web các tổ chức tình nguyện', 'Báo cáo hoạt động cộng đồng'],
  },
  {
    slug: 'song-o-bangkok-sinh-vien',
    title: 'Sống ở Bangkok với tư cách sinh viên: chi phí, vận chuyển và văn hóa địa phương',
    category: 'Đời sống tại Thái Lan',
    excerpt: 'Một bức tranh thực tế về chi phí sinh hoạt, phương tiện di chuyển, ẩm thực và nhịp sống tại Bangkok dành cho sinh viên quốc tế.',
    image: 'https://images.pexels.com/photos/1031659/pexels-photo-1031659.jpeg?auto=compress&cs=tinysrgb&w=1200',
    publishedAt: '2026-04-05',
    updatedAt: '2026-04-30',
    readingTime: '6 phút',
    author: 'Đội ngũ Right Now Education',
    body: 'Bài viết đang được hoàn thiện. Nội dung chính thức sẽ được cập nhật bởi đội ngũ biên tập RNE sau khi kiểm chứng nguồn.',
    sources: ['Số liệu chi phí sinh hoạt Numbeo 2026', 'Trang thông tin BTS/MRT Bangkok'],
  },
  {
    slug: 'roi-du-hoc-thai-lan',
    title: 'ROI của du học Thái Lan: khi nào một khoản đầu tư giáo dục thực sự đáng?',
    category: 'ROI trong giáo dục',
    excerpt: 'Cách đánh giá lợi ích kinh tế và nghề nghiệp của việc học tại Thái Lan, từ học phí đến cơ hội việc làm sau tốt nghiệp.',
    image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1200',
    publishedAt: '2026-03-18',
    updatedAt: '2026-04-10',
    readingTime: '9 phút',
    author: 'Đội ngũ Right Now Education',
    body: 'Bài viết đang được hoàn thiện. Nội dung chính thức sẽ được cập nhật bởi đội ngũ biên tập RNE sau khi kiểm chứng nguồn.',
    sources: ['Báo cáo việc làm Thái Lan', 'Số liệu học phí các trường'],
  },
];
