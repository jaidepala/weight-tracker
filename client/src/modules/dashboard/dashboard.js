import React, { Component } from "react";
import axios from "axios";

// Services
import SimpleSnackbar from '../../services/snackbar';

class Dashboard extends Component {

    constructor(props) {

        super(props);

        // Initialize state
        this.state = { 
            snackBarConfig: {
                message: '',
                action: '',
                duration: 3000,

            }
        };

        this.clickSimpleSnackBar = this.clickSimpleSnackBar.bind(this);
    };
  
    // Fetch passwords after first mount
    componentDidMount() {
        
    };

    clickSimpleSnackBar() {
        this.setState({
            // ...this.state,
            snackBarConfig: {
                message: 'Show Snackbar..',
                action: 'Ok',
                duration: 3000,
            }
        });
    };

    render() {

        return (<div className="dashboard-container">
            <h2>Dashboard</h2>
            <button onClick={this.clickSimpleSnackBar}>Click Me!</button>
            <SimpleSnackbar 
                props={ this.props }
                snackbarConfig={this.state.snackBarConfig }
            />
        </div>);
    };
}

export default Dashboard;
