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
    
    const handleClick = () => {
        setOpen(true);
    };

    function showSnackBar() {

        if (snackbarConfig && snackbarConfig.message) {
            setOpen(true);
        }
    };

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <button onClick={handleClick}>Click Me!</button>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Note archived</span>}
                action={[
                    <Button key="undo" color="secondary" size="small" onClick={handleClose}>
                        UNDO
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