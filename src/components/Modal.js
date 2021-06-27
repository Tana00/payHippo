import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    borderRadius: "5px",
    textAlign: "center",
  },
}));

export default function SignupResponse({ openModal }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(openModal);
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName") || "New User"
  );

  useEffect(() => {
    console.log("openModal", openModal);
  }, [openModal]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={() => {
          setOpen(false);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div className={classes.paper}>
          <h2 id="modal-title">Sign up successfull</h2>
          <p id="modal-description">{`Welcome ${userName}`}</p>
        </div>
      </Modal>
    </div>
  );
}
