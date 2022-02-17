import { useState, useEffect } from 'react'
import { Offcanvas, ButtonGroup, Button, Accordion } from 'react-bootstrap'
import axios from 'axios'
import TasksList from './TasksList'

const Sidebar = (props) => {
    const [userInfo, setUserInfo] = useState()
    const [editableForm, setEditableForm] = useState(false)
    const [tasksCompleted, setTasksCompleted] = useState([])

    const [inputs, setInputs] = useState()

    // const user = props.user

    const toggleEditForm = () => {
        setEditableForm((editableForm) => !editableForm)
    }

    const formEditingHandler = (i, e) => {
        let formData = [...inputs]
        formData[i][e.target.name] = e.target.value
        setInputs(formData)
        console.log(inputs)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    // Manage fields
    useEffect(() => {
        if (userInfo) {
            setUserInfo(props.user)
            console.log(userInfo)
            var result = Object.entries(userInfo)

            //setInputs(Object.keys(user))
            setInputs(result)
            console.log(inputs)
        }
    }, [userInfo])

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
            {userInfo && (
                <Offcanvas.Body>
                    <form onSubmit={handleSubmit}>
                        <fieldset disabled={!editableForm}>
                            {inputs &&
                                inputs.map((input, index) => {
                                    return (
                                        <div key={index}>
                                            <input
                                                name={input[0]}
                                                defaultValue={input[0]}
                                                onChange={(event) =>
                                                    formEditingHandler(
                                                        index,
                                                        event
                                                    )
                                                }
                                            />
                                        </div>
                                    )
                                })}

                            {/* <div className='mb-3'>
                                <label className='form-label'>Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='exampleFormControlInput1'
                                    defaultValue={user.name}
                                />
                            </div> */}
                        </fieldset>
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
                                            props.removeUser(userInfo.id)
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
