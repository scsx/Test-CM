import { useState, useEffect, useRef } from 'react'
import { ButtonGroup, Button } from 'react-bootstrap'

const UserForm = (props) => {
    const [user, setUser] = useState()
    const [editableForm, setEditableForm] = useState(false)

    const refName = useRef()
    const refUsername = useRef()
    const refWebsite = useRef()
    const refPhone = useRef()
    const refEmail = useRef()
    const refCompanyName = useRef()
    const refCompanyPhrase = useRef()
    const refCompanyBs = useRef()

    useEffect(() => {
        setUser(props.data)
    }, [props.data])

    const toggleEditForm = () => {
        setEditableForm((editableForm) => !editableForm)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.updateUser(user)
    }

    const formEditingHandler = (ref, fieldName) => {
        setUser((prevState) => {
            if (!fieldName.startsWith('company')) {
                return {
                    ...prevState,
                    [fieldName]: ref.current.value
                }
            } else {
                const companyDetail = fieldName.substring(
                    fieldName.indexOf('-') + 1
                )
                return {
                    ...prevState,
                    company: {
                        ...prevState.company,
                        [companyDetail]: ref.current.value
                    }
                }
            }
        })
    }
    
    return (
        <form className='userform' onSubmit={handleSubmit}>
            {user && (
                <>
                    <fieldset disabled={!editableForm}>
                        <div className='formfield'>
                            <label>Name</label>
                            <input
                                className='form-control'
                                ref={refName}
                                defaultValue={user.name}
                                onChange={() =>
                                    formEditingHandler(refName, 'name')
                                }
                            />
                        </div>
                        <div className='formfield'>
                            <label>Username</label>
                            <input
                                className='form-control'
                                ref={refUsername}
                                defaultValue={user.username}
                                onChange={() =>
                                    formEditingHandler(refUsername, 'username')
                                }
                            />
                        </div>
                        <div className='formfield'>
                            <label>Email</label>
                            <input
                                className='form-control'
                                ref={refEmail}
                                defaultValue={user.email}
                                type='email'
                                onChange={() =>
                                    formEditingHandler(refEmail, 'email')
                                }
                            />
                        </div>
                        <div className='formfield'>
                            <label>Phone</label>
                            <input
                                className='form-control'
                                ref={refPhone}
                                defaultValue={user.phone.replace(/\D/g, '')}
                                type='number'
                                onChange={() =>
                                    formEditingHandler(refPhone, 'phone')
                                }
                            />
                        </div>
                        <div className='formfield'>
                            <label>Website</label>
                            <input
                                className='form-control'
                                ref={refWebsite}
                                defaultValue={user.website}
                                onChange={() =>
                                    formEditingHandler(refWebsite, 'website')
                                }
                            />
                        </div>
                        <div className='formfield'>
                            <label>Company Name</label>
                            <input
                                className='form-control'
                                ref={refCompanyName}
                                defaultValue={user.company.name}
                                onChange={() =>
                                    formEditingHandler(
                                        refCompanyName,
                                        'company-name'
                                    )
                                }
                            />
                        </div>
                        <div className='formfield'>
                            <label>Company Catch Phrase</label>
                            <input
                                className='form-control'
                                ref={refCompanyPhrase}
                                defaultValue={user.company.catchPhrase}
                                onChange={() =>
                                    formEditingHandler(
                                        refCompanyPhrase,
                                        'company-catchPhrase'
                                    )
                                }
                            />
                        </div>
                        <div className='formfield'>
                            <label>Company BS</label>
                            <input
                                className='form-control'
                                ref={refCompanyBs}
                                defaultValue={user.company.bs}
                                onChange={() =>
                                    formEditingHandler(
                                        refCompanyBs,
                                        'company-bs'
                                    )
                                }
                            />
                        </div>
                    </fieldset>

                    <div className='my-3'>
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
                                        props.deleteUser(user.id)
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
                                        To keep simplicity, this form has no validation or feedback of any kind. Also, address can't be edited but technically it's similar to <i>company</i>.
                                    </i>
                                </p>
                            </>
                        )}
                    </div>
                </>
            )}
        </form>
    )
}

export default UserForm
