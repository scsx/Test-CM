import { useState, useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import userF from '../img/userF.png'
import userM from '../img/userM.png'

const UserTable = (props) => {
    const [userSelected, setUserSelected] = useState()

    const upperCase = (str) => {
        return str.toUpperCase()
    }

    const highlightTr = (id) => {
        props.openModalHandler(id)
        setUserSelected(id)
    }

    useEffect(() => {
        console.log(props)
        if (!props.deselect) {
            setUserSelected(null)
        }
    }, [])

    return (
        <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Avatar</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Company</th>
                </tr>
            </thead>
            <tbody>
                {props.userData.map((user) => (
                    <tr
                        key={user.id}
                        className={userSelected === user.id ? 'selected' : ''}>
                        <td className='center'>{user.id}</td>
                        <td>
                            <Button
                                variant='link'
                                onClick={() => highlightTr(user.id)}>
                                {upperCase(user.name)}
                            </Button>
                        </td>
                        <td>{upperCase(user.username)}</td>
                        <td className='center'>
                            {/* Horrible cheat to check gender, jsonplaceholder doesn't provide one */}
                            <img
                                src={
                                    ['Ervin', 'Nicholas', 'Kurtis'].some(
                                        (word) => user.name.startsWith(word)
                                    )
                                        ? userM
                                        : userF
                                }
                                alt='Avatar'
                            />
                        </td>
                        <td>{upperCase(user.email)}</td>
                        <td>{upperCase(user.address.city)}</td>
                        <td>{upperCase(user.company.name)}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default UserTable
