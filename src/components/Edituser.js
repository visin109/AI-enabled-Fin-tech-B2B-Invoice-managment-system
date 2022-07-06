import * as React from 'react';
import { Box } from "@mui/system"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditUser({open,invoice_currency, cust_payment_terms, sl_no,changeHandler, clickhandler, handleClose}){


  return (
    <div>
      {/* console.log() */}
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit user</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="sl_no"
            id="sl_no"
            value={sl_no}
            label="sl_no"
            type="int"
            fullWidth
            onChange={changeHandler}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="invoice_currency"
            id="invoice_currency"
            label="Invoice currency"
            type="text"
            value={invoice_currency}
            fullWidth
            onChange={changeHandler}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="cust_payment_terms"
            id="cust_payment_terms"
            label="customer payment terms"
            type="text"
            value={cust_payment_terms}
            fullWidth
            onChange={changeHandler}
            variant="standard"
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose(false)}>Cancel</Button>
          <Button onClick={()=>handleClose(true)}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

