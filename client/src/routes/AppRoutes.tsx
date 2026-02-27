import { Routes, Route } from 'react-router-dom';
import Login from '@/pages/Login';
import Menu from '@/pages/Menu';
import Register from '@/pages/Register';

import GestionPersonal from '@/pages/GestionPersonal/GestionPersonal';
import GestionPaciente from '@/pages/GestionPaciente/GestionPaciente';
import GestionCitas from '@/pages/GestionCitas/GestionCitas';
import GestionHistoria from '@/pages/GestionHistoria/GestionHistoria';
import GestionMedicamento from '@/pages/GestionMedicamento/GestionMedicamento';


import DetailsMedicalHistory from '@/pages/Medico/DetailsMedicalHistory';
import SearchMedicalHistory from '@/pages/Admin/SearchMedicalHistory';
import CreateMedicalHistory from '@/pages/Medico/CreateMedicalHistory';
import CreateAuthorization from '@/pages/Medico/CreateAuthorization';
import ListDoctorAppointments from '@/pages/Admin/ListDoctorAppointments';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/register" element={<Register />} />

      <Route path="/gestionPersonal" element={<GestionPersonal />} />
      <Route path="/gestionPaciente" element={<GestionPaciente />} />
      <Route path="/gestionCitas" element={<GestionCitas />} />
      <Route path="/gestionHistoria" element={<GestionHistoria />} />
      <Route path="/gestionMedicamento" element={<GestionMedicamento />} /> 


      <Route path="/listDoctorAppointments" element={<ListDoctorAppointments />} />   {/* Agenda del médico - ADMIN */}
      <Route path="/detailsMedicalHistory" element={<DetailsMedicalHistory />} />
      <Route path="/searchMedicalHistory" element={<SearchMedicalHistory />} />
      <Route path="/createMedicalHistory" element={<CreateMedicalHistory />} />
      <Route path="/createAuthorization" element={<CreateAuthorization />} />
    </Routes>
  );
};

export default AppRoutes;
