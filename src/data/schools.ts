export interface School {
  name: string;
  abbr: string;
  type: 'Trường công' | 'Trường tư' | 'Trường quốc tế' | 'Học viện chuyên ngành';
  city: 'Bangkok' | 'Ngoài Bangkok';
  strengths: string[];
  ranking?: { highlight: string; source: string; year: string };
  partner?: boolean;
}

export const SCHOOLS: School[] = [
  { name: 'Chulalongkorn University', abbr: 'CU', type: 'Trường công', city: 'Bangkok', strengths: ['Kinh doanh', 'Kỹ thuật'], ranking: { highlight: 'Top 1 Thái Lan', source: 'QS World University Rankings', year: '2025' } },
  { name: 'Mahidol University', abbr: 'MU', type: 'Trường công', city: 'Bangkok', strengths: ['Y khoa', 'Khoa học sức khỏe'], ranking: { highlight: 'Top 2 Thái Lan', source: 'QS World University Rankings', year: '2025' } },
  { name: 'Thammasat University', abbr: 'TU', type: 'Trường công', city: 'Bangkok', strengths: ['Luật', 'Kinh tế', 'Khoa học chính trị'] },
  { name: 'Chiang Mai University', abbr: 'CMU', type: 'Trường công', city: 'Ngoài Bangkok', strengths: ['Nông nghiệp', 'Kỹ thuật', 'Y khoa'] },
  { name: 'Kasetsart University', abbr: 'KU', type: 'Trường công', city: 'Bangkok', strengths: ['Nông nghiệp', 'Kinh doanh', 'Kỹ thuật'] },
  { name: "King Mongkut's University of Technology Thonburi", abbr: 'KMUTT', type: 'Trường công', city: 'Bangkok', strengths: ['Kỹ thuật', 'Công nghệ thông tin'] },
  { name: "King Mongkut's Institute of Technology Ladkrabang", abbr: 'KMITL', type: 'Trường công', city: 'Bangkok', strengths: ['Kỹ thuật', 'Kiến trúc'] },
  { name: 'Khon Kaen University', abbr: 'KKU', type: 'Trường công', city: 'Ngoài Bangkok', strengths: ['Y khoa', 'Khoa học sức khỏe', 'Giáo dục'] },
  { name: 'Prince of Songkla University', abbr: 'PSU', type: 'Trường công', city: 'Ngoài Bangkok', strengths: ['Khoa học tự nhiên', 'Kỹ thuật', 'Y khoa'] },
  { name: 'Srinakharinwirot University', abbr: 'SWU', type: 'Trường công', city: 'Bangkok', strengths: ['Giáo dục', 'Nghệ thuật', 'Khoa học xã hội'] },
  { name: 'Asian Institute of Technology', abbr: 'AIT', type: 'Học viện chuyên ngành', city: 'Ngoài Bangkok', strengths: ['Kỹ thuật', 'Môi trường', 'Quản lý'], ranking: { highlight: 'Top trường kỹ thuật quốc tế tại Thái Lan', source: 'QS Asian University Rankings', year: '2024' } },
  { name: 'Bangkok University', abbr: 'BU', type: 'Trường tư', city: 'Bangkok', strengths: ['Truyền thông', 'Kinh doanh', 'Creative Industry'] },
  { name: 'Assumption University', abbr: 'ABAC', type: 'Trường quốc tế', city: 'Bangkok', strengths: ['Kinh doanh quốc tế', 'Kỹ thuật', 'Truyền thông'] },
  { name: 'Rangsit University', abbr: 'RSU', type: 'Trường tư', city: 'Bangkok', strengths: ['Nghệ thuật', 'Y khoa', 'Kinh doanh'] },
  { name: 'Dhurakij Pundit University', abbr: 'DPU', type: 'Trường tư', city: 'Bangkok', strengths: ['Kinh doanh', 'Ngôn ngữ ứng dụng'] },
  { name: 'Sripatum University', abbr: 'SPU', type: 'Trường tư', city: 'Bangkok', strengths: ['Kinh doanh', 'Kỹ thuật', 'Truyền thông'] },
  { name: 'Panyapiwat Institute of Management', abbr: 'PIM', type: 'Học viện chuyên ngành', city: 'Bangkok', strengths: ['Quản trị kinh doanh', 'Bán lẻ', 'Work-based education'] },
  { name: 'CMKL University', abbr: 'CMKL', type: 'Học viện chuyên ngành', city: 'Bangkok', strengths: ['AI', 'Kỹ thuật dữ liệu', 'Công nghệ tài chính'] },
  { name: 'Dusit Thani College', abbr: 'DTC', type: 'Học viện chuyên ngành', city: 'Bangkok', strengths: ['Hospitality', 'Du lịch', 'Nhà hàng'] },
  { name: 'Asian Institute of Hospitality Management', abbr: 'AIH', type: 'Học viện chuyên ngành', city: 'Bangkok', strengths: ['Hospitality', 'Quản lý khách sạn', 'Du lịch'] },
];

export interface DisplaySchool extends Omit<School, 'type'> {
  type: string;
}

export const DISPLAY_SCHOOLS: DisplaySchool[] = [
  ...SCHOOLS.map((school) => ({
    ...school,
    type: school.type === 'Trường công' ? 'Trường công' : 'Trường tư',
  })),
  { name: 'Burapha University', abbr: 'BUU', type: 'Trường công', city: 'Ngoài Bangkok', strengths: ['Kinh doanh', 'Khoa học biển', 'Kỹ thuật'] },
  { name: 'Naresuan University', abbr: 'NU', type: 'Trường công', city: 'Ngoài Bangkok', strengths: ['Khoa học sức khỏe', 'Kỹ thuật', 'Khoa học xã hội'] },
  { name: 'Mahasarakham University', abbr: 'MSU', type: 'Trường công', city: 'Ngoài Bangkok', strengths: ['Giáo dục', 'Khoa học', 'Nghệ thuật'] },
  { name: 'Mae Fah Luang University', abbr: 'MFU', type: 'Trường công', city: 'Ngoài Bangkok', strengths: ['Kinh doanh', 'Khoa học sức khỏe', 'Công nghệ'] },
  { name: 'Suranaree University of Technology', abbr: 'SUT', type: 'Trường công', city: 'Ngoài Bangkok', strengths: ['Kỹ thuật', 'Công nghệ', 'Khoa học'] },
  { name: 'Ubon Ratchathani University', abbr: 'UBU', type: 'Trường công', city: 'Ngoài Bangkok', strengths: ['Nông nghiệp', 'Khoa học', 'Giáo dục'] },
];

export const DISPLAY_SCHOOL_FILTERS = ['Tất cả', 'Trường công', 'Trường tư'] as const;
export type DisplaySchoolFilter = (typeof DISPLAY_SCHOOL_FILTERS)[number];

export const SCHOOL_FILTERS = [
  'Tất cả',
  'Trường công',
  'Trường tư',
  'Trường quốc tế',
  'Học viện chuyên ngành',
  'Bangkok',
  'Ngoài Bangkok',
] as const;

export type SchoolFilter = (typeof SCHOOL_FILTERS)[number];
