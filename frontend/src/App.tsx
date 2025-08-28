/*
import Register from './pages/Register'
import Menu from './pages/Menu'
import Login from './pages/Login'
import ListDoctorAppointments from './pages/Admin/ListDoctorAppointments'
import SummaryHistory from './pages/Medico/SummaryHistory'
import DetailsMedicalHistory from './pages/Medico/DetailsMedicalHistory'
*/
import Footer from './components/Footer'
import CreateMedicalHistory from './pages/Medico/CreateMedicalHistory'

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
      */}
     <CreateMedicalHistory/> 
      <Footer />
    </>
  )
}

export default App
