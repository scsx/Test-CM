import { useState, useEffect } from 'react'
import { Offcanvas, ButtonGroup, Button } from 'react-bootstrap'

const Sidebar = (props) => {
    const [editableForm, setEditableForm] = useState(false)

    const toggleEditForm = () => {
        setEditableForm((editableForm) => !editableForm)
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault()
    }

    const user = props.user

    const handleSubmit = (event) => {
        event.preventDefault()
        alert('You have submitted the form.')
    }
    /* console.log('user: ' + user)
    useEffect(() => {
        console.log('user: ' + props.user)
    }, []) */

    return (
        <Offcanvas
            show={props.sidebarOpen}
            onHide={props.closeModal}
            placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    User detail{' '}
                    {props.user && (
                        <h3 className='display-3'>{props.user.name}</h3>
                    )}
                </Offcanvas.Title>
            </Offcanvas.Header>
            {props.user && (
                <Offcanvas.Body>
                    <form onSubmit={handleSubmit}>
                        <fieldset disabled={!editableForm}>
                            <div className='mb-3'>
                                <label className='form-label'>Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='exampleFormControlInput1'
                                    defaultValue={props.user.name}
                                />
                            </div>
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
                                        onClick={() => {props.removeUser(user.id)}}>
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
                                            Due to time constraints, this form
                                            has no validation or feedback of any
                                            kind.
                                        </i>
                                    </p>
                                </>
                            )}
                        </div>
                    </form>
                </Offcanvas.Body>
            )}
        </Offcanvas>
    )
}

export default Sidebar
