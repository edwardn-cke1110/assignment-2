import Button from "./Button"
import '../styles/Phone.css'

function Phone(props)
{
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.number}</td>
            <td><Button title='Delete' onClick={props.delete} className='delete-btn'/></td>
        </tr>
    )
}

export default Phone