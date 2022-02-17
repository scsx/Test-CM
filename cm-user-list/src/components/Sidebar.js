import { useState, useEffect } from 'react'
import { Offcanvas, ButtonGroup, Button, Accordion } from 'react-bootstrap'
import axios from 'axios'
import Form from './Form'
import TasksList from './TasksList'

const Sidebar = (props) => {
    const [editableForm, setEditableForm] = useState(false)
    const [tasksCompleted, setTasksCompleted] = useState([])

    const toggleEditForm = () => {
        setEditableForm((editableForm) => !editableForm)
    }

    const formEditingHandler = (i, e) => {
        console.log(i, e)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

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

    return (
        <Offcanvas
            show={props.sidebarOpen}
            onHide={props.closeModal}
            placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    User detail{' '}
                    {props.user && (
                        <h3 className='display-5'>{props.user.name}</h3>
                    )}
                </Offcanvas.Title>
            </Offcanvas.Header>
            {props.user && (
                <Offcanvas.Body>
                    <form action=''>
                        <Form data={props.user} editable={editableForm} />

                        <div className='my-5'>
                            {!editableForm && (
                                <ButtonGroup>
                                    <Button
                                        variant='primary'
                                        onClick={toggleEditForm}>
                                        Edit details
                                    </Button>
                                    <Button
                                        variant='danger'
                                        onClick={() => {
                                            props.removeUser(props.user.id)
                                        }}>
                                        Delete user
                                    </Button>
                                </ButtonGroup>
                            )}
                            {editableForm && (
                                <>
                                    <ButtonGroup>
                                        <Button variant='success' type='submit'>
                                            Save changes
                                        </Button>
                                        <Button
                                            variant='outline-secondary'
                                            onClick={toggleEditForm}>
                                            Cancel
                                        </Button>
                                    </ButtonGroup>
                                    <p className='mt-3'>
                                        <b className='d-block'>Note</b>
                                        <i>
                                            To keep simplicity, this form has no
                                            validation or feedback of any kind.
                                        </i>
                                    </p>
                                </>
                            )}
                        </div>
                    </form>
                    <TasksList tasks={tasksCompleted} />
                </Offcanvas.Body>
            )}
        </Offcanvas>
    )
}

export default Sidebar
