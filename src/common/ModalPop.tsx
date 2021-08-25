/*  
  To make a better application we have make a component that we can reuse 
  we have make a common component of modalpop up of material ui.
  
  over here Modal pop up divide into three section 
  1. Title 
  2. content
  3. Dialog box

  for each we have created a different function and carried out a data as a props
*/

import { IconButton, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import React, { ReactNode } from "react";

// css
const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: "1rem 1.5rem",
      backgroundColor: "#f5f5f5",
    },
    closeButton: {
      position: "absolute",
      right: "8px",
      top: "25px",
      color: theme.palette.grey[500],
    },
  });

//Title section of Dialog Box
export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  classes: any;
  onClose: () => void;
} // props types

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          X
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

// content section
const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    borderBottom: "unset",
    paddingBottom: 0,
  },
}))(MuiDialogContent);

// ModalPopup props type
interface IProps {
  modalTitle: ReactNode;
  modalBody: ReactNode;
  onCloseDetails: any;
  size: any;
}

const ModalPopup = ({
  modalTitle,
  modalBody,
  onCloseDetails,
  size,
}: IProps) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    try {
      setOpen(false);
      onCloseDetails();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Dialog
        PaperProps={{
          style: { borderRadius: 12 },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={size}
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <h1
            style={{
              margin: "13px 0px 13px",
              lineHeight: "normal",
            }}
          >
            {modalTitle}
          </h1>
        </DialogTitle>
        <DialogContent dividers>{modalBody}</DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalPopup;
