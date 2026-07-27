import LegalLayout from '@/components/LegalLayout';

export default function RefundPage() {
  return (
    <LegalLayout title="Chính sách hoàn phí" updated="2026-07-01">
      <p>Chính sách này quy định điều kiện và quy trình hoàn phí đối với các dịch vụ của Right Now Education (RNE).</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">1. Điều kiện hoàn phí</h2>
      <p>Khách hàng có thể yêu cầu hoàn phí trong trường hợp dịch vụ chưa bắt đầu hoặc không đạt thỏa thuận do lỗi từ phía RNE. Chi tiết điều kiện được quy định trong hợp đồng.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">2. Các khoản không hoàn lại</h2>
      <p>Các khoản phí đã thanh toán cho bên thứ ba (học phí, phí ứng tuyển, phí visa, phí dịch thuật...) không thuộc phạm vi hoàn phí của RNE.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">3. Quy trình hoàn phí</h2>
      <p>Khách hàng gửi yêu cầu hoàn phí qua email admin@rightnow-education.info. RNE xem xét và phản hồi trong vòng 7 ngày làm việc. Khoản hoàn phí (nếu được duyệt) được chuyển trong vòng 14 ngày làm việc.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">4. Trường hợp ngoại lệ</h2>
      <p>Nếu khách hàng cung cấp thông tin sai lệch hoặc vi phạm điều khoản dịch vụ, RNE có quyền từ chối hoàn phí.</p>
    </LegalLayout>
  );
}
