import React from 'react';

export default class ContactCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e){
        if(e.charCode === 13){
            this.handleClick();
        }
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClick() {
        const contact = {
            name : this.state.name,
            phone : this.state.phone
        };

        this.props.onCreate(contact);

        this.setState({
            name : "",
            phone : ''
        })

        this.nameInput.focus();
    }


    render() {
        return (
            <div>
                <h2>
                    contact create form!
                </h2>
                <div>
                    <input type="text"
                           name="name"
                           placeholder="name"
                           value={this.state.name}
                           onChange={this.handleChange}
                           ref={(ref)=>this.nameInput=ref}
                    />
                    <input type="text"
                           name="phone"
                           placeholder="phone"
                           value={this.state.phone}
                           onChange={this.handleChange}
                           onKeyPress={this.handleKeyPress}
                    />
                </div>
                <div>
                    <button
                        onClick={this.handleClick}>click</button>
                </div>
            </div>
        );
    }
}

ContactCreate.defaultProps = {
    onCreate : () => console.log("on create not defined")
};