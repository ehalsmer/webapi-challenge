import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectPage = (props) => {
    const projectId = props.match.params.id;
    const [project, setProject] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8002/projects/${projectId}`)
        .then(res => {
            setProject(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }, [projectId])

    return(
        <>
        <h1>{project.name}</h1>
        <div>{project.description}</div>
        <div>{project.notes}</div>
        {project.completed ? <div>Complete</div> : <div>Incomplete</div>}
        </>
    )

}

export default ProjectPage;