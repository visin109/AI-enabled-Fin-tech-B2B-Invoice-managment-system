import { Grid, Box, CssBaseline,Checkbox, TableContainer,TablePagination,TableHead, Button,Paper, Table, TableRow, TableCell, TableBody } from "@mui/material";
import React, { useReducer } from 'react';
import { useEffect, useState } from "react";
// import {getData} from '../services/data';
import Adduser from './Adduser';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import { AddUser } from '../services/data';      

export default function Addbutton() {
const [open, setOpen] = React.useState(false);
const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
}; 
const [user,setUser]=useState({business_code:"", invoice_currency:"",buisness_year:"", baseline_create_date:"", area_business:"", invoice_id:"", cust_number:"", doc_id:"", due_in_date:"",total_open_amount:"", 
posting_date:"", document_type:"", cust_payment_terms:"",clear_date:"", document_create_date:"", posting_id:""})
const {business_code, invoice_currency,business_year, baseline_create_date, area_business, invoice_id, cust_number, doc_id, due_in_date, total_open_amount, posting_date, document_type, cust_payment_terms,clear_date, document_create_date, posting_id}=user;
const changeHandler=(e)=>{
    const {name,value}=e.target;
    setUser({...user,[name]:value});
  }
  const clickhandler=async (e)=>{
    e.preventDefault();
    let response=await AddUser(user);
    if (response)
      {
      setUser({sl_no:"",business_code:"", invoice_currency:"",buisness_year:"", baseline_create_date:"", area_business:"", invoice_id:"", cust_number:"", doc_id:"", due_in_date:"",total_open_amount:"", 
      posting_date:"", document_type:"", cust_payment_terms:"",clear_date:"", document_create_date:"", posting_id:""});
    }
    console.log(response);
  } 
  

  return <>
  <Button style = {{width :80, height : 30,borderColor: "#16aef2",backgroundColor:"",color : "white"}} variant="outlined" onClick = {handleClickOpen}>Add</Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle >Add User</DialogTitle>
              <DialogContent>
              <Adduser
              business_code = {business_code} 
              business_year = {business_year}
              // invoice_currency={invoice_currency}
              baseline_create_date = {baseline_create_date}
              area_business = {area_business}
              invoice_id = {invoice_id} 
              cust_number = {cust_number} 
              doc_id = {doc_id} 
              due_in_date = {due_in_date} 
              total_open_amount = {total_open_amount} 
              posting_date  = {posting_date} 
              document_type ={document_type} 
              cust_payement_terms= {cust_payment_terms}
              clear_date = {clear_date}
              document_create_date = {document_create_date}
              posting_id = {posting_id}
              changeHandler ={changeHandler}
              clickhandler={clickhandler}
              closeHandler = {handleClose}

              />
              </DialogContent>
            </Dialog>
            </>
}