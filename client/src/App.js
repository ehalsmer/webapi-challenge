import React from 'react';
import "semantic-ui-css/semantic.min.css";
import './App.css';
import Nav from './Nav';
import Projects from './projects';
import ProjectPage from './projectPage';
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import { Container } from "semantic-ui-react";


function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" component={Nav} />
        <Container>
          <Route exact path="/projects/" component={Projects} />
          <Route exact path="/projects/:id/" render={props => <ProjectPage {...props}/>}/>
          {/* <Route path="/newproject/" component={NewProject}/> */}
        </Container>
      </div>
    </Router>
  );
}


export default App;
