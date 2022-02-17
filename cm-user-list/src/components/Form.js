import { useState, useEffect } from 'react'
import { Offcanvas, ButtonGroup, Button, Accordion } from 'react-bootstrap'
import axios from 'axios'
import TasksList from './TasksList'

const Form = (props) => {
    return (
        <fieldset disabled={!props.editable}>
            {JSON.stringify(props.data)}
        </fieldset>
    )
}

export default Form
