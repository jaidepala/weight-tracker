import React, { Component } from "react";
import axios from "axios";
import classNames from "classnames";

// Material Components
    import Paper from '@material-ui/core/Paper';
    import Button from '@material-ui/core/Button';
    import ButtonGroup from '@material-ui/core/ButtonGroup';
    import List from '@material-ui/core/List';
    import ListItem from '@material-ui/core/ListItem';
    import ListItemText from '@material-ui/core/ListItemText';
    import Divider from '@material-ui/core/Divider';
    import Grid from '@material-ui/core/Grid';
    import DateFnsUtils from '@date-io/date-fns';
    import MomentUtils from '@date-io/moment';
    // import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
    import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
    import IconButton from '@material-ui/core/IconButton';
    import InputAdornment from '@material-ui/core/InputAdornment';
    import TextField from '@material-ui/core/TextField';
    import MenuItem from '@material-ui/core/MenuItem';
    import Visibility from '@material-ui/icons/Visibility';
    import VisibilityOff from '@material-ui/icons/VisibilityOff';

class CreateProfile extends Component {

    /* 
        !   Reference Links
        *   
        *   Date:
        *       https://codesandbox.io/s/owe28
        *       https://material-ui.com/components/pickers/ 
    */

    constructor( props ) {

        super( props );

        this.state = {

            // userDateOfBirth: new Date('18/8/2014'),
            _isMounted: false,
            userDateOfBirth: new Date(),
            userHeight: "",
            userWeight: "",
            userHeightType: "",
            userWeightType: "",
            userGender: "",
            weightLabels: [
                {
                    value: '1',
                    label: 'kg',
                },
                {
                    value: '2',
                    label: 'lbs',
                }
            ],
            heightLabels: [
                {
                    value: '1',
                    label: 'inches',
                },
                {
                    value: '2',
                    label: 'cms',
                }
            ]
        };

        this.changeDateOfBirth = this.changeDateOfBirth.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getDetails = this.getDetails.bind(this);
        this.saveDetails = this.saveDetails.bind(this);
        this.callApi = this.callApi.bind(this);
        this.setGender = this.setGender.bind(this);
    };

    componentDidMount() {

        this.setState({
            _isMounted: true
        });
        
        this.getDetails();
    };

    componentWillUnmount() {

        this.setState({
            _isMounted: false
        });
    };

    changeDateOfBirth( date ) {

        console.log('date', date);
        
        // setSelectedDate(date);
    };

    startOfMonth(date) { 
    
        return this.getStartOfMonth(date); 
    };

    setGender(genderType) {

        this.setState({
            ...this.state,
            userGender: genderType
        });
    };

    handleChange(theProp, event) {

        this.setState({ 
            ...this.state, 
            [theProp]: event.target.value 
        });
    };

    saveDetails() {
        
        axios.post("api/user/add-details", {
            dateofbirth: this.state.userDateOfBirth,
            height: this.state.userHeight,
            weight: this.state.userWeight,
            heightType: this.state.userHeightType,
            weightType: this.state.userWeightType,
            gender: this.state.userGender,
            userId: localStorage.getItem('user')
        })
        .then(res => {

            if (res && res != null) {
                this.getDetails();
            }
        })
        .catch(err => {

            console.log('err', err);
        });
    };

    callApi( theApi ) {

        axios.get(theApi)
            .then(res => {

                console.log('res', res);
            })
            .catch(err => {

                console.log('err', err);
            });
    };

    getDetails() {

        axios.get("api/user/get-details")
        .then(res => {

            if (res && res.data && res.data.success) {

                let updateObj = {

                    userDateOfBirth: res.data.data.dateofbirth,
                    userHeight: res.data.data.height,
                    userWeight: res.data.data.weight,
                    userHeightType: res.data.data.heightType,
                    userWeightType: res.data.data.weightType,
                    userGender: res.data.data.gender
                };

                for(var tKey in updateObj)
                {
                    if(updateObj.hasOwnProperty(tKey))
                    {
                        this.handleChange(tKey, {
                            target: {
                                value: updateObj[tKey]
                            }
                        })
                    }
                };
            };
        })
        .catch(err => {

            console.log('err', err);
        });
    };

    render() {

        let userGender = this.state.userGender && this.state.userGender.toLowerCase();

        return (
            <Paper className="profile-container">
                <List component="nav" aria-label="profile details">
                    <ListItem>
                        <Grid container alignItems="center" justify="space-around">

                            <Grid item xs={2}>

                                <ListItemText primary="Date of Birth" />
                            </Grid>
                            <Grid item xs={10}>

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">

                                        <KeyboardDatePicker
                                            fullWidth
                                            id="userDateOfBirth"
                                            margin="normal"
                                            label="Select Date of Birth"
                                            format="MM/DD/YYYY"
                                            value={this.state.userDateOfBirth}
                                            onChange={this.changeDateOfBirth}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider />
                    <ListItem divider space={2}>

                        <Grid container alignItems="center" justify="space-around">
                            <Grid item xs={2}>
                                <ListItemText primary="Weight" margin="normal" />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    id="user-input-weight"
                                    label="Your Weight"
                                    value={this.state.userWeight}
                                    onChange={(evt) => { this.handleChange("userWeight", evt); }}
                                    type="number"
                                    InputProps={{ 
                                        inputProps: { min: 1 } 
                                    }}
                                    name="user-input-weight"
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    select
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    label="Weight Type"
                                    value={this.state.userWeightType}
                                    onChange={(evt) => { this.handleChange("userWeightType", evt); }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"> in </InputAdornment>,
                                    }}>

                                    {this.state.weightLabels.map(option => (
                                        <MenuItem key={option.value} value={option}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem>

                        <Grid container>
                            <Grid item xs={2}>
                                <ListItemText primary="Height" margin="normal" />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    id="user-input-height"
                                    label="Your Height"
                                    value={this.state.userHeight}
                                    onChange={(evt) => { this.handleChange("userHeight", evt); }}
                                    type="number"
                                    InputProps={{
                                        inputProps: { min: 1, step: 0.5 }
                                    }}
                                    name="user-input-height"
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    select
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    label="Height Type"
                                    value={this.state.userHeightType}
                                    onChange={(evt) => { this.handleChange("userHeightType", evt); }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"> in </InputAdornment>,
                                    }}>

                                    {this.state.heightLabels.map(option => (
                                        <MenuItem key={option.value} value={option}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider light />
                    <ListItem>
                        <Grid container alignItems="center" justify="space-around">
                            <Grid item xs={2}>
                                <ListItemText primary="Gender" />
                            </Grid>
                            <Grid item xs={10}>

                                <ButtonGroup fullWidth size="large" aria-label="small outlined button group">
                                    <Button className={userGender == 'male' ? 'MuiButton-containedPrimary' : ''} onClick={this.setGender.bind(this, 'Male')}>
                                        Male
                                    </Button>
                                    <Button className={userGender == 'female' ? 'MuiButton-containedPrimary' : ''} onClick={this.setGender.bind(this, 'Female')}>
                                        Female
                                    </Button>
                                    <Button className={userGender == 'not applicable' ? 'MuiButton-containedPrimary' : ''} onClick={this.setGender.bind(this, 'Not Applicable')}>
                                        Not Applicable
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Grid container alignItems="center" justify="space-around">
                            <Grid item xs={12}>
                                <Button variant="contained" size="large" color="primary" onClick={() => this.saveDetails()}>
                                    Save
                                </Button>
                                <Button variant="contained" size="large" color="primary" onClick={() => this.getDetails()}>
                                    Get Details
                                </Button>
                                <Button variant="contained" size="large" color="primary" onClick={this.callApi.bind(this, "api/admin")}>
                                    Admin
                                </Button>
                                <Button variant="contained" size="large" color="primary" onClick={this.callApi.bind(this, "api/login/logout")}>
                                    Logout
                                </Button>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
            </Paper>
        );
    };

};

export default CreateProfile;

