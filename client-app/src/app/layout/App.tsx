import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import  '../layout/styles.css';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/activities/home/HomePage';
import {
  Route,
  Switch,
  useLocation} from "react-router-dom";
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/dashboard/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';


function App() {

  const location = useLocation();
  return (
    <>
    <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage}/>
      <Route path={'/(.+)'} render={() => (
        <>
          <NavBar />
          <Container style={{marginTop:'7em'}}>
            <Switch>
              <Route exact path='/activities' component={ActivityDashboard}/>
              <Route path='/activities/:id' component={ActivityDetails}/>
              <Route path='/createActivity' component={ActivityForm}/>
              <Route key={location.key} path='/manage/:id' component={ActivityForm}/>
              <Route path='/errors' component={TestErrors}/>
              <Route path='/server-error' component={ServerError}/>
              <Route path='/login' component={LoginForm}/>
              <Route component={NotFound} />
            </Switch>
          </Container>
      </>
      )} />

    </>
  );
}

export default observer(App);