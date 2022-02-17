import { Accordion } from 'react-bootstrap'

const TasksList = (props) => {
    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Tasks completed ({props.tasks.length})</Accordion.Header>
                <Accordion.Body>
                    <ul className='list-unstyled'>
                        {props.tasks.map((task) => (
                            <li key={task.id}>{task.title}</li>
                        ))}
                    </ul>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default TasksList
