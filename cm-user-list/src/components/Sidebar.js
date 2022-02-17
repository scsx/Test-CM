import { useState, useEffect } from 'react'
import { Offcanvas } from 'react-bootstrap'
import axios from 'axios'
import UserForm from './UserForm'
import TasksList from './TasksList'

const Sidebar = (props) => {
    const [tasksCompleted, setTasksCompleted] = useState([])

    // Get tasks
    useEffect(() => {
        if (props.user) {
            axios
                .get(
                    `https://jsonplaceholder.typicode.com/users/${props.user.id}/todos`
                )
                .then((res) => {
                    setTasksCompleted(
                        res.data.filter((x) => x.completed === true)
                    )
                })
        }
    }, [props.user])

    let address = null
    if (props.user) {
        let ad = props.user.address
        address = (
            <div className='address'>
                <span>
                    {ad.street}, {ad.suite}
                </span>
                <br />
                <span>
                    {ad.zipcode}, {ad.city} (
                    {ad.geo.lat}, {ad.geo.lng})
                </span>
            </div>
        )
    }

    return (
        <Offcanvas
            show={props.sidebarOpen}
            onHide={props.closeModal}
            placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    {props.user && (
                        <>
                            <h3 className='display-5'>{props.user.name}</h3>
                            {address}
                        </>
                    )}
                </Offcanvas.Title>
            </Offcanvas.Header>
            {props.user && (
                <Offcanvas.Body>
                    <UserForm data={props.user} updateUser={props.updateUser} deleteUser={props.removeUser} />
                    <TasksList tasks={tasksCompleted} />
                </Offcanvas.Body>
            )}
        </Offcanvas>
    )
}

export default Sidebar
