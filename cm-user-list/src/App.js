import './main.scss'
import { useState, useEffect } from 'react'
import logo from './img/logo.png'
import axios from 'axios'
import { Offcanvas, Button } from 'react-bootstrap'
import UserTable from './components/UserTable'

const App = () => {
    // isMounted to prevent the error: Warning: Can't perform a React state update on an unmounted component.
    let isMounted = true
    const [usersList, setUsersList] = useState([])
    const [userDetail, setUserDetail] = useState()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [editableForm, setEditableForm] = useState(false)

    const handleClose = () => setIsMenuOpen(false)
    const handleShow = (id) => {
        setIsMenuOpen(true)
        setUserDetail(usersList.find((x) => x.id === id))
    }

    const editForm = () => {
        setEditableForm(true)
    }

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
            if (isMounted) setUsersList(res.data)
        })
        return () => {
            isMounted = false
        }
    }, [])

    return (
        <div className='App'>
            <Offcanvas show={isMenuOpen} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        User detail{' '}
                        {userDetail && (
                            <h3 className='display-3'>{userDetail.name}</h3>
                        )}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                {userDetail && (
                    <Offcanvas.Body>
                        <form>
                            <fieldset disabled={!editableForm}>
                                <div className='mb-3'>
                                    <label className='form-label'>Name</label>
                                    <input
                                        type='email'
                                        className='form-control'
                                        id='exampleFormControlInput1'
                                        defaultValue={userDetail.name}
                                    />
                                </div>
                            </fieldset>
                            <div className='my-5'>
                                <Button variant='secondary' onClick={editForm}>
                                    Edit details
                                </Button>
                            </div>
                        </form>
                    </Offcanvas.Body>
                )}
            </Offcanvas>

            <nav className='navbar navbar-light bg-light'>
                <div className='container'>
                    <a
                        className='navbar-brand'
                        href='https://caixamagica.pt/'
                        target='_blank'>
                        <img src={logo} className='logo' alt='logo' />
                        Teste Jorge Soucasaux Monteiro
                    </a>
                </div>
            </nav>
            <main>
                <div className='container'>
                    <h1 className='display-5'>
                        <Button variant='outline-primary' size='sm'>
                            Reset users
                        </Button>
                        User List{' '}
                        <small className='text-muted'>
                            <a
                                href='https://jsonplaceholder.typicode.com/users'
                                target='_blank'>
                                jsonplaceholder.typicode.com/users
                            </a>
                        </small>
                    </h1>
                    <div className='tableFixHead'>
                        <UserTable
                            userData={usersList}
                            openModalHandler={handleShow}
                            deselect={isMenuOpen}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default App
