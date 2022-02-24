
import axios from 'axios';
import {useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import  '../layout/styles.css';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(res => {
      setActivities(res.data);
    })
  },[]);

  return (
    <>
      <NavBar />
      <Container style={{marginTop:'7em'}}>
        <ActivityDashboard activities={activities} />
      </Container>
    </>
  );
}

export default App;