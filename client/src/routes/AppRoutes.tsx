import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
import Register from '../pages/Register';
import AppointmentManagement from '../pages/Admin/AppointmentManagement';
import ListDoctorAppointments from '../pages/Admin/Medico/ListDoctorAppointments';
import DetailsMedicalHistory from '../pages/Medico/DetailsMedicalHistory';
import SummaryHistory from '../pages/Admin/Medico/SummaryHistory';
import SearchMedicalHistory from '../pages/Admin/Medico/SearchMedicalHistory';
import CreateMedicalHistory from '../pages/Medico/CreateMedicalHistory';
import CreateAuthorization from '../pages/Medico/CreateAuthorization';
import PersonnelManagement from '../pages/Admin/PersonnelManagement';
import PatientsManagement from '../pages/Admin/PatientsManagement';
import AuthorizationManagement from '../pages/Admin/AuthorizationManagement';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/register" element={<Register />} />
      <Route path="/personnelManagement" element={<PersonnelManagement />} />         {/* Gestión del personal - ADMIN */}
      <Route path="/patientsManagement" element={<PatientsManagement />} />           {/* Gestión de pacientes - ADMIN */}
      <Route path="/appointmentManagement" element={<AppointmentManagement />} />     {/* Gestión de citas - ADMIN */}
      <Route path="/listDoctorAppointments" element={<ListDoctorAppointments />} />   {/* Agenda del médico - ADMIN */}
      <Route path="/summaryHistory" element={<SummaryHistory />} />                   {/* Historia clínica - ADMIN */}
      <Route path="/authorizationManagement" element={<AuthorizationManagement />} /> {/* Autorizaciones - ADMIN */}
      <Route path="/detailsMedicalHistory" element={<DetailsMedicalHistory />} />
      <Route path="/searchMedicalHistory" element={<SearchMedicalHistory />} />
      <Route path="/createMedicalHistory" element={<CreateMedicalHistory />} />
      <Route path="/createAuthorization" element={<CreateAuthorization />} />
    </Routes>
  );
};

export default AppRoutes;
