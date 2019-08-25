import React, { Component } from "react";
// import axios from "axios";

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

            userDateOfBirth: new Date('2014-08-18T21:11:54'),
            userHeight: "",
            userWeight: "",
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
    };

    changeDateOfBirth( date ) {

        console.log('date', date);
        
        // setSelectedDate(date);
    };

    handleChange(theProp, event) {

        this.setState({ 
            ...this.state, 
            [theProp]: event.target.value 
        });
    };

    render() {

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

                                    <KeyboardDatePicker
                                        fullWidth
                                        id="userDateOfBirth"
                                        label="Select Date of Birth"
                                        format="DD/MM/YYYY"
                                        value={this.state.userDateOfBirth}
                                        onChange={this.changeDateOfBirth}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
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
                                    value={this.state.userWeight}
                                    onChange={(evt) => { this.handleChange( "userWeight", evt ); }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"> in </InputAdornment>,
                                    }}>

                                    {this.state.weightLabels.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
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
                                    value={this.state.userHeight}
                                    onChange={(evt) => { this.handleChange("userHeight", evt); }}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"> in </InputAdornment>,
                                    }}>

                                    {this.state.heightLabels.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
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
                                    <Button>Male</Button>
                                    <Button>Female</Button>
                                    <Button>None</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
            </Paper>
        );
    };

};

export default CreateProfile;

