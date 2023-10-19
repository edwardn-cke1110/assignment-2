import { useState, useEffect } from 'react'; 
import Button from './elements/Button';
import Contact from './elements/Contact';
import './App.css';

function App() {

    const [contacts, setContacts] = useState([]);
    
    useEffect(() => {
        fetchContacts();
    }, []);

    function fetchContacts()
    {
        fetch('http://localhost/api/contacts')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setContacts(data);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }
    
    function addContact()
    {        
        const reqOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: document.getElementById('contact-name-textbox').value
            })
        };
        
        fetch('http://localhost:5000/api/contacts', reqOptions)
        .then(response => response.json())
        .then(data => console.log("Added ", data.name ," to contacts"))
        .then(() => fetchContacts())
    }
    
    function deleteContact(id)
    {
        fetch('http://localhost:5000/api/contacts/' + id, {method: 'DELETE'})
        .then(() => console.log("Removed contact ", id ))
        .then(() => fetchContacts())
    }
 
    const listContacts = contacts.map(contact =>
        // <li>{contact.id} | {contact.name}</li>
        <Contact key={contact.id} name={contact.name} id={contact.id} delete={() => deleteContact(contact.id)}/>
    )
    
    return (
        <div id="main">
            <div id="header">
                <h1>Contacts</h1>
                <input id="contact-name-textbox" type="text" placeholder='Contact Name'></input>
                <Button title="Create Contact" onClick={addContact} className='add-btn'/>
            </div>
            <div id="contact-list">
                {listContacts}
            </div>
        </div>
    );
}

export default App;