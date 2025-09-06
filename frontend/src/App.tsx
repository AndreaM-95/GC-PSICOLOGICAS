/*
import Menu from './pages/Menu'
import Register from './pages/Register'
import Login from './pages/Login' //HASTA AQUÍ HAY SEMÁNTICA
import ListDoctorAppointments from './pages/Admin/ListDoctorAppointments'
import SummaryHistory from './pages/Medico/SummaryHistory'
import DetailsMedicalHistory from './pages/Medico/DetailsMedicalHistory'
import SearchMedicalHistory from './pages/Admin/SearchMedicalHistory'
import CreateMedicalHistory from './pages/Medico/CreateMedicalHistory'
import CreateAuthorization from './pages/Medico/CreateAuthorization'
*/

import Gestiones from './pages/Admin/Gestiones'
import Footer from './components/Footer'

function App() {
  return (
    <>
      {/*
      <Login /> 
      <Register />
      <Menu/>
      <ListDoctorAppointments />    //Falta semántica
      <SummaryHistory />            //Falta semántica
      <DetailsMedicalHistory />     //Falta semántica
      <SearchMedicalHistory/>       //Falta semántica
      <CreateMedicalHistory/> 
      <CreateAuthorization/>
      */}
      <Gestiones/>
      <Footer />
    </>
  )
}

export default App
