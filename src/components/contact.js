import React from 'react';
import ContactInfo from "./contactInfo";
import ContactDetails from "./contactDetails";
import update from "react-addons-update"
import ContactCreate from "./contactCreate";

export default class Contact extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedKey : -1,
            keyword : '',
            contactData : [
                {name:'김동훈2', phone : '010-5375-0816'},
                {name:'김동훈4', phone : '010-5375-0816'},
                {name:'김동훈1', phone : '010-5375-0816'},
                {name:'김동훈3', phone : '010-5375-0816'}
            ]
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentWillMount(){
        const contactData = localStorage.contactData;
        if(contactData){
            this.setState({
                contactData : JSON.parse(contactData)
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        let currentStateContactData = JSON.stringify(this.state.contactData);
        if(JSON.stringify(prevState.contactData) != currentStateContactData){
            localStorage.setItem("contactData", currentStateContactData); 
        }
    }

    handleCreate(contact){
        this.setState({
            contactData : update(this.state.contactData, {$push: [contact]})
        });
    }

    handleRemove(){
        if(this.state.selectedKey === -1){
            return ;
        }

        this.setState({
            contactData : update(this.state.contactData, {
                $splice : [[this.state.selectedKey,1]]
            }),
            selectedKey : -1
        })
    }

    handleEdit(name, phone){
        if(this.state.selectedKey === -1){
            return ;
        }

        this.setState({
            contactData : update(this.state.contactData, {
                    [this.state.selectedKey] : {
                        'name' : {$set : name},
                        'phone' : {$set : phone}
                    }
                })
        })
    }

    handleChange(e){
        this.setState({
            keyword : e.target.value
        })
    }

    handleClick(key){
        this.setState({
            selectedKey : key
        })
    }

    render(){
        const mapToContact = (contacts, handleClick) => {
            return contacts
                .sort((contact1, contact2) => {
                    return contact1.name > contact2.name;
                })
                .filter((contact) => contact.name.toLowerCase().indexOf(this.state.keyword) > -1)
                .map((contact, index) => {
                    return <ContactInfo
                        contact={contact}
                        key={index}
                        onClick={() => handleClick(index)}
                    />
                })
        }

        return <div>
            <h1>Contact !!!</h1>
            <div>
                <input
                    name="keyword"
                    placeholder="search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
            </div>
            <div>{mapToContact(this.state.contactData, this.handleClick)}</div>

            <h1>Contact details !!</h1>
            <div>
                <ContactDetails
                    isSelected={this.state.selectedKey!==-1}
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}
                />
            </div>
            <div>
                <ContactCreate onCreate={this.handleCreate}/>
            </div>
        </div>;
    }
}