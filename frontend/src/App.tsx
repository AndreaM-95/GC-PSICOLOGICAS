/*
import Register from './pages/Register'
import Menu from './pages/Menu'
import Login from './pages/Login' //HASTA AQUÍ HAY SEMÁNTICA
import ListDoctorAppointments from './pages/Admin/ListDoctorAppointments'
import SummaryHistory from './pages/Medico/SummaryHistory'
import DetailsMedicalHistory from './pages/Medico/DetailsMedicalHistory'
import SearchMedicalHistory from './pages/Admin/SearchMedicalHistory'*/
import CreateMedicalHistory from './pages/Medico/CreateMedicalHistory'

import Footer from './components/Footer'

function App() {
  return (
    <>
      {/*
      <Login /> 
      <Register />
      <Menu/>
      <ListDoctorAppointments />
      <SummaryHistory />
      <DetailsMedicalHistory />
      <SearchMedicalHistory/>
      */}
      <CreateMedicalHistory/> 
      <Footer />
    </>
  )
}

export default App
