import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
import Register from '../pages/Register';
import AppointmentManagement from '../pages/Admin/AppointmentManagement';
import ListDoctorAppointments from '../pages/Admin/ListDoctorAppointments';
import DetailsMedicalHistory from '../pages/Medico/DetailsMedicalHistory';
import SummaryHistory from '../pages/Medico/SummaryHistory';
import SearchMedicalHistory from '../pages/Admin/SearchMedicalHistory';
import CreateMedicalHistory from '../pages/Medico/CreateMedicalHistory';
import CreateAuthorization from '../pages/Medico/CreateAuthorization';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/register" element={<Register />} />
      <Route path="/appointmentManagement" element={<AppointmentManagement />} />   {/* Cita médica - ADMIN */}
      <Route path="/listDoctorAppointments" element={<ListDoctorAppointments />} /> {/* Agenda del médico - ADMIN */}
      <Route path="/summaryHistory" element={<SummaryHistory />} />
      <Route path="/detailsMedicalHistory" element={<DetailsMedicalHistory />} />
      <Route path="/searchMedicalHistory" element={<SearchMedicalHistory />} />
      <Route path="/createMedicalHistory" element={<CreateMedicalHistory />} />
      <Route path="/createAuthorization" element={<CreateAuthorization />} />
    </Routes>
  );
};

export default AppRoutes;
