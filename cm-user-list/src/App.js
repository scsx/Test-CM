import './main.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import logo from './img/logo.png'
import { Button } from 'react-bootstrap'
import UserTable from './components/UserTable'
import Sidebar from './components/Sidebar'

const App = () => {
    const [usersList, setUsersList] = useState([])
    const [userDetail, setUserDetail] = useState()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const resetUsers = () => {
        localStorage.setItem('localUsers', null)
        axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
            setUsersList(res.data)
            saveUsersLocally(res.data)
        })
    }

    const saveUsersLocally = (arr) => {
        localStorage.setItem('localUsers', JSON.stringify(arr))
    }

    const deleteUser = (id) => {
        const removeIndex = usersList.findIndex((x) => x.id === id)
        setUsersList((usersList) => {
            return usersList.splice(removeIndex, 1)
        })
        saveUsersLocally(usersList)
        setIsSidebarOpen(false)
    }

    useEffect(() => {
        const localStorageUsers = JSON.parse(localStorage.getItem('localUsers'))
        if (localStorageUsers && localStorageUsers.length > 0) {
            setUsersList(localStorageUsers)
        } else {
            axios
                .get('https://jsonplaceholder.typicode.com/users')
                .then((res) => {
                    setUsersList(res.data)
                })
        }
    }, [usersList.length])

    const handleClose = () => setIsSidebarOpen(false)
    const handleShow = (id) => {
        setIsSidebarOpen(true)
        setUserDetail(usersList.find((x) => x.id === id))
    }

    return (
        <div className='App'>
            <Sidebar
                user={userDetail}
                closeModal={handleClose}
                sidebarOpen={isSidebarOpen}
                removeUser={deleteUser}
            />
            <nav className='navbar navbar-light bg-light'>
                <div className='container'>
                    <a
                        className='navbar-brand'
                        href='https://caixamagica.pt/'
                        target='_blank'>
                        <img src={logo} className='logo' alt='logo' />
                        Teste Jorge Soucasaux Monteiro
                    </a>
                    <a
                    className='text-muted'
                        href='https://github.com/scsx/Test-CM'
                        target='_blank'>
                        repo
                    </a>
                </div>
            </nav>
            <main>
                <div className='container'>
                    <h1 className='display-5'>
                        <Button
                            variant='outline-primary'
                            size='sm'
                            onClick={resetUsers}>
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
                            deselect={isSidebarOpen}
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default App
