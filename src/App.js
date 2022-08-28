
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory
} from 'react-router-dom'
import { Login } from './components/layout/Login';
import { Header } from './components/layout/Header';
import { Fragment } from 'react';
import { Home } from './components/layout/Home';
import { HomeTemplate } from './components/template/HomeTemplate';
import { UserLoginTemplate } from './components/template/UserLoginTemplate';
import LoginJira from './components/LoginJira/LoginJira';
import { LoadingComponent } from './components/layout/LoadingComponent';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { historyAction } from './redux/actions/JiraBugsAction'
import { JiraTemplate } from './components/template/JiraTemplate/JiraTemplate';

import { IndexJiraApp } from './components/JiraBugsApp/IndexJiraApp';
import ProjectCreation from './components/JiraBugsApp/ProjectPage/ProjectCreation';
import { ProjectList } from './components/JiraBugsApp/ProjectPage/ProjectList';
import { ModalJiraProject } from './components/JiraBugsApp/HOC/ModalJiraProject';
import { UserMainPage } from './components/JiraBugsApp/UserPage/UserMainPage';
import { DragAndDropDnd } from './components/JiraBugsApp/dragAndDropDnd/DragAndDropDnd';


function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(historyAction(history))
  }, [])
  return (
    <>


      <LoadingComponent />
      <ModalJiraProject />
      <div className="App">
        <HomeTemplate exact path={'/home'} Component={Home} />
        <JiraTemplate exact path='/dashboard' Component={IndexJiraApp} />
        <JiraTemplate exact path='/newproject' Component={ProjectCreation} />
        <JiraTemplate exact path='/project/:id' Component={IndexJiraApp} />
        <JiraTemplate exact path='/projects' Component={ProjectList} />
        <JiraTemplate exact path='/users' Component={UserMainPage} />
        <UserLoginTemplate exact path={'/'} Component={LoginJira} />
        <HomeTemplate exact path='/drag' Component={DragAndDropDnd} />
      </div>




    </>

  );
}

export default App;
