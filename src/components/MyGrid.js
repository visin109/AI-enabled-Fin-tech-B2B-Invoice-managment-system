import { Grid, Box, CssBaseline, TableContainer,TablePagination,TableHead, Button,Paper, Table, TableRow, TableCell, TableBody } from "@mui/material";
import Stack from '@mui/material/Stack';
import { Checkbox, TextField } from "@material-ui/core";
import React, { useReducer } from 'react';
import {useEffect, useState } from "react";
import {getData} from '../services/data';
import Adduser from './Adduser'
import Edituser from "./Edituser";
import { Deleteuser } from "../services/data"
import { Updateuser } from "../services/data"
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddButton  from './AddButton';
import Pagination from "./pagination";
import {getSearch} from "../services/data"
import AdvSearch from "./AdvSearch";
import { predict } from "../services/data";
import Sort from './Sort';
import abclogo from "../images/abclogo.svg";
import hrclogo from "../images/hrclogo.svg";
function MyGrid(){

    const [data,setData]=useState([]);
    const [columns,setColumns] = useState(["sl_no","business_code","cust_number","clear_date","buisness_year","doc_id","posting_date","document_create_date","document_create_date1","due_in_date","invoice_currency","document_type","posting_id","area_business","total_open_amount","baseline_create_date","cust_payment_terms","invoice_id","name_customer","business_name"])

    const [user,setUser]=useState({sl_no:"",business_code:"", invoice_currency:"",buisness_year:"", baseline_create_date:"", area_business:"", invoice_id:"", cust_number:"", doc_id:"", due_in_date:"",total_open_amount:"", 
      posting_date:"", document_type:"", cust_payment_terms:"",clear_date:"", document_create_date:"", posting_id:""})
    // const {sl_no,business_code, invoice_currency,business_year, baseline_create_date, area_business, invoice_id, cust_number, doc_id, due_in_date, total_open_amount, posting_date, document_type, cust_payment_terms,clear_date, document_create_date, posting_id}=user;
    const [editUser, setEdit] = useState({sl_no:'', invoice_currency:'',cust_payment_terms:''});
    const [open,setOpen]=React.useState(false);
    const [count,setCount]=React.useState(0);
    const [page,setPage]=React.useState(0);         
    const [pageSize,setPageSize]=React.useState(10);
    const [rowsPerPage,setRowsPerPage]=React.useState(10);
    const [orderBy,setOrderBy]=React.useState("sl_no")
    const [order,setOrder]=React.useState("ASC")
    const[search, setSearch] = useState(false);
    const [adv, setadv] = useState({business_code:'',buisness_year:'', baseline_create_date:'', invoice_id:'', cust_number:'', doc_id:'', due_in_date:'', total_open_amount:'', posting_date:'', document_type:'', cust_payment_terms:'',invoice_currency:'', clear_date:'', document_create_date:'', posting_id:''})
    const [input, setInput] = useState('');
    var {business_code, buisness_year, baseline_create_date, area_business, invoice_id, cust_number, doc_id, due_in_date, total_open_amount, posting_date, document_type, cust_payment_terms,invoice_currency,clear_date, document_create_date, posting_id} = user;
    var {sl_no,invoice_currency, cust_payment_terms } = editUser;
    var {invoice_id, doc_id, buisness_year,cust_number} = adv;
    const [anaopen, setanaopen] = React.useState(false);

    const handleChangePage=(event,newPage)=>{
      setPage(newPage);
    }
    const anaHandler = () => {
      setanaopen(true);
      console.log(anaopen);
      }

      const anaClose = () => {
        setanaopen(false);
      }   

    const handleChangeRowsPerPage=(event)=>{
      setRowsPerPage(parseInt(event.target.value,10))
      setPage(0);
    }
    const sortingHandler=(newField)=>{
      if(orderBy==newField){
        let Order=order=="ASC"?"DESC":"ASC";
        setOrder(Order);

      }else{
        setOrder("ASC");
      }
      setOrderBy(newField);
      window.alert(orderBy + " with order "  +  order);

    }
    const searchHandler=()=>{
      setSearch(true);

    }
    const advSearchHandler = (e) => {
      const {name, value} = e.target;
      setadv({...adv,[name] :value});
    }
    const handleSearch = async (update) => {
      if(update){
        let response = await getSearch(adv);     
        window.alert('found match at Serial Number ' + response[10]+response[11]);
        setadv({business_code:'',buisness_year:'', baseline_create_date:'', invoice_id:'', cust_number:'', doc_id:'', due_in_date:'', total_open_amount:'', posting_date:'', document_type:'', cust_payment_terms:'',invoice_currency:'', clear_date:'', document_create_date:'', posting_id:''})
      }
      setSearch(false);
  }

   
    // const changeHandler=(e)=>{
    //   const {name,value}=e.target;
    //   setUser({...user,[name]:value});
    // }
    // const clickhandler=async (e)=>{
    //   e.preventDefault();
    //   let response=await Adduser(user);
    //   if (response){
    //     setUser({sl_no:"",business_code:"", invoice_currency:"",buisness_year:"", baseline_create_date:"", area_business:"", invoice_id:"", cust_number:"", doc_id:"", due_in_date:"",total_open_amount:"", 
    //     posting_date:"", document_type:"", cust_payment_terms:"",clear_date:"", document_create_date:"", posting_id:""});
    //   }
    // }
    const changeHandler=(e)=>{
      const {name,value}=e.target;
      setEdit({...editUser,[name]:value});
    }
    console.log(page);
    
    const handleClose = async(update) => {
      if(update){
        let response=await Updateuser(editUser); 
        document.location.reload(true);
      }
      setOpen(false);
    };
  
    
    const handleClickOpen=()=>{
      setOpen(true);
    }
    const deleteHandler = async (e) =>
    {
      console.log(e.target.checked==true)
      if(e.target.checked){
        let response =  await Deleteuser(sl_no);
        document.location.reload(true)

      }
    }
  
    
    const editHandler=()=>{
      setOpen(true);
    }
  
    
    const checkHandler=(e,sl_no)=>{
      if (e.target.checked){
        let editUser=data.filter(user=>user.sl_no==sl_no)[0];
        setEdit(editUser);
      }
    }
    // console.log(editUser)
      
    
    
    let inputHandler = (e) => {
      var lowerCase = e.target.value.toLowerCase();
      setInput(lowerCase);
      console.log(input)
      }
    



    // useEffect(async()=>{
    //     setData(await getData())
    // },[]);
    useEffect(async function(){
      console.log(page);
      let data=await getData(page,rowsPerPage,order,orderBy);
      setData(data['data']);
      setCount(data['count']);
    },[rowsPerPage,page,order,orderBy]);
    const handlePredict = () => {
      let data = {
       
        name_customer:editUser.name_customer,
        business_code:editUser.business_code,
        cust_number: editUser.cust_number,
        clear_date: editUser.clear_date,
        buisness_year: editUser.buisness_year,
        doc_id:editUser.doc_id,
        posting_date:editUser.posting_date,
        due_in_date: editUser.due_in_date,
        baseline_create_date: editUser.baseline_create_date,
        cust_payment_terms: editUser.cust_payment_terms,
        converted_usd: editUser.invoice_currency==="CAD"?editUser.total_open_amount*0.79:editUser.total_open_amount}
        
        let age = predict(data)
    }
    return <>
    <div>
        <img className = "abclogo"src = {abclogo}  alt = "ABCLogo" />
        <img className = "highradiuslogo" src ={hrclogo}  alt = "HighradiusLogo" />    
    </div>
    <div classname = "grid">
    <div className='container grid'>
    <div className="left">
    <div>
      <Stack direction="row" spacing={3}>
      <Button style = {{height : 40, width:80, background: "#16aef2",borderColor: "#16aef2"}} variant="contained" onClick = {handlePredict}>Predict</Button>
      <Button style = {{height : 40, width:80, backgroundColor:"#172f3f",borderColor:"#16aef2",color:'white', width:150}} variant="outlined" onClick={anaHandler}>Analytics</Button>
      <Dialog
        open={anaopen}
        onClose={anaClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert variant="outlined" severity="warning">
              Analytics feature in under development.
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={anaClose}>okay</Button>
        </DialogActions>
      </Dialog>
      <AdvSearch invoice_id = {  invoice_id }  cust_number = {cust_number} doc_id = { doc_id } buisness_year = {buisness_year} handleSearch={handleSearch} open = {search} changeHandleSearch = {advSearchHandler} />
      <Button style = {{height :40,width:80,borderColor:"#16aef2" ,backgroundColor : "#172f3f", color:'white', width:150}} variant="outlined" onClick = {searchHandler}>Advance Search</Button>
      <Button style = {{height:40, width:50}}onClick = {() => document.location.reload(true)}><RefreshIcon /></Button>
      <div className = "center">
        <TextField  className = 'search' style = {{outline :"None",background:'white' , color:'white'}} id="standard-basic" label="Search id" variant="outlined" onChange={inputHandler}/>
      </div>
      <AddButton />
      <Edituser invoice_currency={invoice_currency} cust_payment_terms={cust_payment_terms} sl_no={sl_no} open={open} handleClose={handleClose} changeHandler={changeHandler}/>
      <Button variant="contained" sx={{width:120,height:30,borderColor:"white",color:'white'}} onClick={editHandler}>Edit</Button>
      <Button variant="outlined" sx={{width:120,height:30,borderColor:"white",color:'white'}} onClick = {(e)=>deleteHandler(e)}>Delete</Button>
      </Stack>
      </div>
      </div>
    </div>
    </div>


  {/* <div className = "right">
    <Stack direction="row" spacing={2}>
    <AddButton />
    <Edituser invoice_currency={invoice_currency} cust_payment_terms={cust_payment_terms} sl_no={sl_no} open={open} handleClose={handleClose} changeHandler={changeHandler}/>
    <Button variant="contained" sx={{width:120,height:0,borderColor:"white",backgroundColor:"#172f3f",color:'white'}} onClick={editHandler}>Edit</Button>
    <Button variant="outlined" sx={{width:120,height:30,borderColor:"white",color:'white'}} onClick = {(e)=>deleteHandler(e)}>Delete</Button>
    </Stack>
    </div> */}

      {/* <Deleteuser sl_no==sl_no /> */}
      {/* <Button style = {{width : 120, height : 50,borderColor: "white",color : "white"}} variant="outlined"  onclick={AddButton}>Add</Button> */}
    {/* <AddbBu</> */}
    <TableContainer component={Paper} style = {{backgroundColor:"#31414F", outlineStyle:"solid"}} className = "grid">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow >
              <TableCell  style ={{color:"white"}} align=""><Sort order = {order} orderBy = {orderBy} /></TableCell>
              {/* <TableCell style ={{color:"white"}} align="">select</TableCell> */}
              <TableCell onClick={()=>sortingHandler("sl_no")} style ={{color:"white"}} align="">sl_no</TableCell>
              <TableCell onClick={()=>sortingHandler("business_code")}style ={{color:"white"}} align="">business_code</TableCell>
              <TableCell onClick={()=>sortingHandler("cust_number")}style ={{color:"white"}} align="">cust_number</TableCell>
              <TableCell onClick={()=>sortingHandler("clear_date")}style ={{color:"white"}} align="">clear_date</TableCell>
              <TableCell onClick={()=>sortingHandler("buisness_year")}style ={{color:"white"}} align="">buisness_year</TableCell>
              <TableCell onClick={()=>sortingHandler("doc_id")}style ={{color:"white"}} align="">doc_id</TableCell>
              <TableCell onClick={()=>sortingHandler("posting_date")}style ={{color:"white"}} align="">posting_date</TableCell>
              <TableCell onClick={()=>sortingHandler("document_create_date")}style ={{color:"white"}} align="">document_create_date</TableCell>
              <TableCell onClick={()=>sortingHandler("due_in_date")}style ={{color:"white"}} align="">due_in_date</TableCell>
              <TableCell onClick={()=>sortingHandler("invoice_currency")}style ={{color:"white"}} align="">invoice_currency</TableCell>
              <TableCell onClick={()=>sortingHandler("document_type")}style ={{color:"white"}} align="">document_type</TableCell>
              <TableCell onClick={()=>sortingHandler("posting_id")}style ={{color:"white"}} align="">posting_id</TableCell>
              <TableCell onClick={()=>sortingHandler("total_open_amount")}style ={{color:"white"}} align="">total_open_amount</TableCell>
              <TableCell onClick={()=>sortingHandler("baseline_create_date")}style ={{color:"white"}} align="">baseline_create_date</TableCell>
              <TableCell onClick={()=>sortingHandler("cust_payment_terms")}style ={{color:"white"}} align="">cust_payment_terms</TableCell>
              <TableCell onClick={()=>sortingHandler("invoice_id")}style ={{color:"white"}} align="">invoice_id</TableCell>
              <TableCell onClick={()=>sortingHandler("aging_bucket")}style ={{color:"white"}}align="">aging_bucket</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {data.map(user => (
            <TableRow
              key={user.sl_no}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
          <TableCell component="th" scope="user">
            <Checkbox onClick={(e)=>checkHandler(e,user.sl_no)}/>
          </TableCell>
                <TableCell component="th" scope="user">
                  {user.sl_no}
                
              </TableCell>
              <TableCell style ={{color:"white"}} align="">{user.business_code}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.cust_number}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.clear_date}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.buisness_year}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.doc_id}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.posting_date}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.document_create_date}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.due_in_date}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.invoice_currency}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.document_type}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.posting_id}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.total_open_amount}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.baseline_create_date}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.cust_payment_terms}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.invoice_id}</TableCell>
              <TableCell style ={{color:"white"}} align="">{user.aging_bucket}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div style = {{paddingDown : 25}}></div>
    <div className = "footer">
      <center><p><a className = 'footer-link'href='#'>Privacy Policy</a>|© 2022 HighRadius Corporation. All rights reserved</p></center>
    </div>   
    <div classname = "page">
      <Pagination 
      style = {{marginLeft : "50%", textAlign:"right"}}
      count={count} 
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      pageSize={pageSize}
      onPageSizeChange={(newPage) => setPageSize(newPage)}
  />
  </div>
        
  </>
}
export default MyGrid
