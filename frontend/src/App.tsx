//import Menu from './pages/Menu'
/**/
// import Register from './pages/Register'
// import Login from './pages/Login' //HASTA AQUÍ HAY SEMÁNTICA
//import ListDoctorAppointments from './pages/Admin/ListDoctorAppointments'
// import SummaryHistory from './pages/Medico/SummaryHistory'
// import DetailsMedicalHistory from './pages/Medico/DetailsMedicalHistory'
// import SearchMedicalHistory from './pages/Admin/SearchMedicalHistory'
// import CreateMedicalHistory from './pages/Medico/CreateMedicalHistory'
 import CreateAuthorization from './pages/Medico/CreateAuthorization'
// import MedicalAppointmentManagement from './pages/Admin/MedicalAppointmentManagement'

import Footer from './components/Footer'
//import AppointmentManagement from './pages/Admin/AppointmentManagement'

function App() {
  return (
    <>
      {/*
      <Login /> 
      <Register />
      <Menu/>
      <AppointmentManagement/>      // Cita médica - ADMIN
      <ListDoctorAppointments />    // Agenda del médico - ADMIN
      <DetailsMedicalHistory />     //Falta semántica
      <SummaryHistory />            //Falta semántica
      <SearchMedicalHistory/>       //Falta semántica
      <CreateMedicalHistory/> 
      */}
      <CreateAuthorization/>
      <Footer />
    </>
  )
}

export default App
