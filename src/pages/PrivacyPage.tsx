import LegalLayout from '@/components/LegalLayout';

export default function PrivacyPage() {
  return (
    <LegalLayout title="Chính sách bảo mật" updated="2026-07-01">
      <p>Right Now Education (RNE) cam kết bảo vệ thông tin cá nhân của khách hàng. Chính sách này mô tả cách RNE thu thập, sử dụng và bảo vệ dữ liệu của bạn.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">1. Thông tin thu thập</h2>
      <p>RNE thu thập thông tin bạn cung cấp qua form tư vấn: họ tên, năm sinh, email, số điện thoại, trình độ học vấn, quốc gia và dịch vụ quan tâm, ngân sách dự kiến và nội dung cần hỗ trợ.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">2. Mục đích sử dụng</h2>
      <p>Thông tin được sử dụng để liên hệ tư vấn, xây dựng lộ trình học tập và cải thiện chất lượng dịch vụ. RNE không bán hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba vì mục đích thương mại.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">3. Lưu trữ và bảo mật</h2>
      <p>Dữ liệu được lưu trữ trên hệ thống có kiểm soát truy cập. RNE áp dụng các biện pháp kỹ thuật và tổ chức hợp lý để bảo vệ thông tin khỏi truy cập trái phép.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">4. Quyền của bạn</h2>
      <p>Bạn có quyền yêu cầu truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình bất kỳ lúc nào bằng cách liên hệ qua email admin@rightnow-education.info.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">5. Liên hệ</h2>
      <p>Mọi câu hỏi về chính sách bảo mật vui lòng gửi về admin@rightnow-education.info.</p>
    </LegalLayout>
  );
}
