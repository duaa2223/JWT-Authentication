
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem('token'); // التحقق من وجود التوكن

  if (!token) {
    return <Navigate to="/login" />; // إذا لم يكن هناك توكن، يتم إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
  }

  return children; // السماح بالوصول إلى الصفحة المحمية
};

export default ProtectedRoute;
