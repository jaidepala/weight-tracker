import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        close: {
            padding: theme.spacing(0.5),
        },
    }),
);

export default function SimpleSnackbar( props ) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    let snackbarConfig = props.snackbarConfig;

    function openSnackBar() {

        console.log('snackbarConfig', snackbarConfig);
        
        setOpen(true);
    };
    
    const handleClick = () => {

        openSnackBar();
    };

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    console.log('snackbarConfig', snackbarConfig);
    
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={ snackbarConfig.duration || 5000 }
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{ snackbarConfig.message }</span>}
                action={[
                    <Button key="undo" color="secondary" size="small" onClick={handleClose}>
                        { snackbarConfig.action }
                    </Button>,
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}>

                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </div>
    );
}