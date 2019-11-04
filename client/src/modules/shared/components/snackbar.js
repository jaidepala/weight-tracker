import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

// import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        close: {
            padding: theme.spacing(0.5),
        },
        success: {
            backgroundColor: green[600],
        },
        error: {
            backgroundColor: theme.palette.error.dark,
        },
        info: {
            backgroundColor: theme.palette.primary.main,
        },
        warning: {
            backgroundColor: amber[700],
        },
        icon: {
            fontSize: 20,
        },
        iconVariant: {
            opacity: 0.9,
            marginRight: theme.spacing(1),
        },
        message: {
            display: 'flex',
            alignItems: 'center',
        },
    })
);

export default function WtSnackbar( props ) {
    const classes = useStyles();
    // const { ...other } = props.snackbarConfig;
    // const [open, setOpen] = React.useState(false);
    let snackbarConfig = props.snackbarConfig;
    const Icon = snackbarConfig && snackbarConfig.icon && variantIcon[snackbarConfig.icon];

    // function openSnackBar() {

    //     console.log('snackbarConfig', snackbarConfig);
        
    //     setOpen(true);
    // };
    
    // const handleClick = () => {

    //     openSnackBar();
    // };

    // const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setOpen(false);
    // };
    
    if (Icon && Icon != null)
    {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={snackbarConfig.open}
                    autoHideDuration={snackbarConfig.duration || 5000}
                    onClose={snackbarConfig.close}>

                    <SnackbarContent
                        className={clsx(classes[snackbarConfig.icon], classes.margin)}
                        aria-describedby="client-snackbar"
                        message={
                            <span id="wt-snackbar" className={classes.message}>
                                <Icon className={clsx(classes.icon, classes.iconVariant)} />
                                {snackbarConfig.message}
                            </span>
                        }
                        action={[
                            <IconButton key="close" aria-label="close" color="inherit" onClick={snackbarConfig.close}>
                                <CloseIcon className={classes.icon} />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
            </div>
        );
    }
    else
    {
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={ snackbarConfig.open }
                    autoHideDuration={ snackbarConfig.duration || 5000 }
                    onClose={snackbarConfig.close}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{ snackbarConfig.message }</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={snackbarConfig.close}>
                            { snackbarConfig.action }
                        </Button>,
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            className={classes.close}
                            onClick={snackbarConfig.close}>
    
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </div>
        );
    }
}