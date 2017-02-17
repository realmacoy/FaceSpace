import React from 'react';

var AccountComponent = React.createClass({
    getInitialState() {
        return {
            name: "",
            message: "",
            success: ""
        }
    },
    handleNameChange(e) {
        e.preventDefault();
        this.setState({name: e.target.value, message: "..."})
    },
    handleSubmit(e) {
        e.preventDefault();
        let name = this.state.name;
        fetch('http://localhost:8080/accountCreation/createAccount?userName=' + name, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({message: 'Account: '+ name +' created!'});
            }
            else{
                this.setState({message: 'Account: ' + name + ' was already taken...'});
            }
        })
    },
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" defaultValue={this.state.name} onChange={this.handleNameChange}/>
                    </label>
                    <input type="submit" value="Create Account!" />
                </form>
                Name: {this.state.name}
                <br/>
                Message: {this.state.message}
                <br/>
            </div>
        );
    }
});

export class AccountCreation extends React.Component {
    render() {
        return(
            <div>
                <AccountComponent/>
            </div>
        );
    }
}