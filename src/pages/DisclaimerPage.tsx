import LegalLayout from '@/components/LegalLayout';

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Tuyên bố miễn trừ trách nhiệm" updated="2026-07-01">
      <p>Tuyên bố này làm rõ phạm vi trách nhiệm của Right Now Education (RNE) đối với thông tin và dịch vụ cung cấp.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">1. Tính chất thông tin</h2>
      <p>Thông tin trên website RNE mang tính tham khảo. Học phí, học bổng, thứ hạng và điều kiện tuyển sinh có thể thay đổi theo từng kỳ. RNE kiểm tra lại nguồn chính thức trước khi khách hàng đưa ra quyết định hoặc nộp hồ sơ.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">2. Không đảm bảo kết quả</h2>
      <p>RNE không cam kết đảm bảo kết quả nhập học, học bổng, internship hoặc visa. Quyết định cuối cùng thuộc về trường, tổ chức cấp học bổng và cơ quan chức năng.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">3. Đối tác và trường</h2>
      <p>Việc một trường xuất hiện trên website không đồng nghĩa với việc trường đó là đối tác tuyển sinh chính thức của RNE. Trạng thái đối tác được ghi rõ khi đã xác minh.</p>
      <h2 className="text-xl font-bold text-brand-black mt-6">4. Nội dung bên thứ ba</h2>
      <p>RNE không chịu trách nhiệm về nội dung trên các trang web bên ngoài được liên kết. Khách hàng nên kiểm tra nguồn chính thức trước khi quyết định.</p>
    </LegalLayout>
  );
}
