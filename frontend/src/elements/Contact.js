import { useState, useEffect } from "react";
import Button from "./Button";
import '../styles/Contact.css';
import Phone from "./Phone";

function Contact(props)
{
    const [opened, setOpened] = useState(false);
    const [phones, setPhones] = useState([]);
    const fetchUrl = 'http://localhost/api/contacts/' + props.id;

    useEffect(() => {
        fetchPhones();
    }, []);
    
    function fetchPhones()
    {
        fetch(fetchUrl + '/phones')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setPhones(data);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }
    
    function addPhone()
    {        
        
        const reqOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: document.getElementById('phone-name-textbox').value,
                number: document.getElementById('phone-number-textbox').value
            })
        };

        fetch(fetchUrl + '/phones', reqOptions)
        .then(response => response.json())
        .then(data => console.log("Added ", data.name ," to contact", props.name))
        .then(() => fetchPhones())
    }

    function deletePhone(id)
    {
        fetch(fetchUrl + '/phones/' + id, {method: 'DELETE'})
        .then(() => console.log('Removed phone ' + id + ' from ' + props.id))
        .then(() => fetchPhones());
    }

    const listPhones = phones.map(phone => 
        <Phone name={phone.name} number={phone.number} key={phone.id} id={phone.id} delete={() => deletePhone(phone.id)}/>)
    
    function toggleOpened()
    {
        if (opened)
        {
            setOpened(false);
        }
        else {setOpened(true)};
    }
    
    if (!opened)
    {
        return (
            <div className="contact-card" key={props.id}>
                <div className="contact-top">
                    <h3 onClick={toggleOpened}>{props.name}</h3>
                    <Button title='Delete' onClick={props.delete}/>
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div className="contact-card opened" key={props.id} >
                <div className="contact-top">
                    <h3 onClick={toggleOpened}>{props.name}</h3>
                    <Button title='Delete' onClick={props.delete}/>
                </div>
                <div>
                    <input id="phone-name-textbox" placeholder="Name"></input>
                    <input id="phone-number-textbox" placeholder="Number"></input>
                    <Button title="Add" onClick={addPhone}/>
                </div>
                <div className="phone-list">
                    <table>
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Number</th>
                            <th></th>
                        </tr>
                        {listPhones}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    
}

export default Contact; 