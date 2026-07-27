import LegalLayout from '@/components/LegalLayout';

export default function TermsPage() {
  return (
    <LegalLayout title="Điều khoản dịch vụ" updated="2026-07-01">
      <p>Điều khoản này quy định quyền và trách nhiệm giữa Right Now Education (RNE) và khách hàng khi sử dụng dịch vụ tư vấn giáo dục.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">1. Phạm vi dịch vụ</h2>
      <p>RNE cung cấp dịch vụ tư vấn giáo dục chuyên sâu về Thái Lan, bao gồm chọn trường, học bổng, internship, tình nguyện và mentorship. Các dịch vụ có thể được triển khai tại các quốc gia khác tùy điều kiện hồ sơ.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">2. Cam kết của RNE</h2>
      <p>RNE cam kết minh bạch về học phí, học bổng, điều kiện đầu vào và khả năng cạnh tranh. RNE không cam kết đảm bảo kết quả nhập học, học bổng, internship hoặc visa trừ khi có thỏa thuận bằng văn bản.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">3. Trách nhiệm khách hàng</h2>
      <p>Khách hàng cung cấp thông tin chính xác, đầy đủ và kịp thời để RNE hỗ trợ hiệu quả. Khách hàng chịu trách nhiệm về các quyết định cuối cùng dựa trên tư vấn của RNE.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">4. Phí dịch vụ</h2>
      <p>Phí dịch vụ được quy định rõ trong từng gói và hợp đồng. Phí dịch vụ không bao gồm học phí, phí ứng tuyển, phí visa và các khoản phí bên thứ ba.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">5. Thay đổi điều khoản</h2>
      <p>RNE có quyền cập nhật điều khoản. Phiên bản mới có hiệu lực ngay khi được đăng trên website.</p>
    </LegalLayout>
  );
}
