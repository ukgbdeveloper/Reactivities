import {useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import  '../layout/styles.css';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/activities/home/HomePage';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {

  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities()
  },[activityStore]);


  if (activityStore.loadingInitial) return <LoadingComponents content="Loading..." />;

  return (
    <>
      <NavBar />
      <Container style={{marginTop:'7em'}}>
        <Routes>
        <Route path='/' element={<HomePage/>}>
          
        </Route>
        <Route path='/dashboard' element={<ActivityDashboard/>}>
          
        </Route>
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);