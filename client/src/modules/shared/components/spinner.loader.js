import React from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { styleLoading } from "./keyframes";
import { loadingWheel } from "./keyframes";
// import { loaderSpinner } from "./keyframes";
/* 
    REF:
    http://jsfiddle.net/8k2NV/2/
*/

export default function SpinnerLoader( props ) {
    const [open, setOpen] = React.useState(false);
    const { startLoading } = props;

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <div>
            <Dialog
                open={startLoading}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogContent style={styleLoading}>
                    <DialogContentText style={loadingWheel}>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}