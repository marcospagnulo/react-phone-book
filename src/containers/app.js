import React, { Component } from 'react';
import NavBar from '../components/navbar';
import { Route, Switch } from 'react-router-dom';
import Home from './home';
import Profile from './profile';
import Contacts from './contacts';
import AlertBox from '../components/alertBox';

class App extends Component {

    constructor(props) {
        super(props);
        this.showMessageBox = this.showMessageBox.bind(this);
        this.state = {
            messageBox: {
                show: false,
                text: "",
                level: ""
            }
        };
    }

    showMessageBox(text, level) {

        // show message box
        this.setState({ messageBox: { show: true, text: text, level: level } });

        // hide and reset message box after few seconds
        setTimeout(() => {
            var messageBox = { ...this.state.messageBox }
            messageBox.show = false;
            this.setState({ messageBox })
        }, 3000);
    }

    render() {
        return (
            <div>

                {/* Navigation bar */}
                <NavBar />

                {/* Main content */}
                <div className="container-fluid">
                    <div className="p-4"></div>
                    <Switch>
                        <Route exact={true} path="/" component={Home} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/contacts" render={() => <Contacts showMessageBox={this.showMessageBox} />} />
                        <Route path="/contacts/:contactId" component={Contacts} />
                    </Switch>
                </div>

                { /* Alert box*/}
                <AlertBox
                    message={this.state.messageBox.text}
                    className={"alert alert-" + this.state.messageBox.level}
                    display={this.state.messageBox.show} />
            </div>
        );
    }
}

export default App;