import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import  '../layout/styles.css';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/activities/home/HomePage';
import {
  Route,
  Routes,
  useLocation} from "react-router-dom";
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/dashboard/ActivityDetails';

function App() {

  const location = useLocation();
  return (
    <>
      <NavBar />
      <Container style={{marginTop:'7em'}}>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/activities' element={<ActivityDashboard/>}/>
          <Route path='/activities/:id' element={<ActivityDetails/>}/>
          <Route path='/createActivity' element={<ActivityForm key={location.key}/>}/>
          <Route path='/manage/:id' element={<ActivityForm key={location.key}/>}/>
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);