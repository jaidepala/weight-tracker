import React, { Component } from "react";
import axios from "axios";

// Services
import { Utils } from '../../services/util';
import SimpleSnackbar from '../../services/snackbar';

class Dashboard extends Component {

    constructor(props) {

        super(props);

        // Initialize state
        this.state = {
        };

        this.clickSimpleSnackBar = this.clickSimpleSnackBar.bind(this);
    };
  
    // Fetch passwords after first mount
    componentDidMount() {
        
    };

    clickSimpleSnackBar() {

        console.log(Utils.ShowSnackBar({
            open: true,
            message: 'Show Snackbar..',
            action: 'Ok',
            duration: 3000,
        }) );
    };

    render() {

        return (<div className="dashboard-container">
            <h2>Dashboard</h2>
            <button onClick={this.clickSimpleSnackBar}>Click Me!</button>
            {Utils.ShowSnackBar({
                open: true,
                message: 'Show Snackbar..',
                action: 'Ok',
                duration: 3000,
            }) }
        </div>);
    };
}

export default Dashboard;
