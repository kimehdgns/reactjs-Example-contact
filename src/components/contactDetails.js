import React from 'react';

export default class ContactDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            name: '',
            phone: '',
        }

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e){
        if(e.charCode === 13){
            this.handleToggle();
        }
    }

    handleEdit() {
        this.props.onEdit(this.state.name, this.state.phone);
    }

    handleToggle() {
        if (this.state.isEdit === false) {
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            })
        } else {
            this.handleEdit();
        }

        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        const blank = (<div>select the contact !!</div>);
        const details = (<div>
            <div>{this.props.contact.name}</div>
            <div>{this.props.contact.phone}</div>
        </div>);

        const edit = (
            <div>
                <div>
                    <input type="text"
                           name="name"
                           placeholder="name"
                           value={this.state.name}
                           onChange={this.handleChange}
                    />
                </div>
                <div>
                    <input type="text"
                           name="phone"
                           placeholder="phone"
                           value={this.state.phone}
                           onChange={this.handleChange}
                           onKeyPress={this.handleKeyPress}
                    />
                </div>
            </div>
        );

        const view = (this.state.isEdit ? edit : details);

        return <div>
            <button onClick={this.props.onRemove}>remove</button>
            <button onClick={this.handleToggle}>
                {this.state.isEdit ? 'ok' : 'edit'}
            </button>
            {this.props.isSelected ? view : blank}
        </div>
    }
}

ContactDetails.defaultProps = {
    contact: {
        name: 'default name',
        phone: 'default phone',
    },
    onRemove: () => console.log("onRemove is not defined"),
    onEdit: () => console.log("onEdit is not defined")
}