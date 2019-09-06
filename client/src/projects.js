import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8002/projects")
      .then(response => {
        console.log(response);
        setProjects(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>Projects</h1>
      <Card.Group itemsPerRow='3'>
        {projects.map(project => (
          <Card as={Link} to={`/projects/${project.id}`} color="teal"><p className='project-card'>{project.name}</p></Card>
        ))}
      </Card.Group>
    </>
  );
};

export default Projects;
