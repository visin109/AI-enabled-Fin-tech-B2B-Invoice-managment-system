import axios from "axios";
export const getData= async(start,limit,order,orderBy)=>{
    let str="start="+(start*limit)+"&limit="+limit+"&orderby="+orderBy+"&order="+order;
    let response=await axios.get("http://localhost:8080/user_application/Dataloading?"+str);
    let data=response.data.backend;
    let count=response.data.count;
    console.log(data);
    data.map((backend,index)=>({...backend,"id":index}))
    return {data,count};
}
export const AddUser=async({business_code, invoice_currency,buisness_year, baseline_create_date, area_business, invoice_id, cust_number, doc_id, due_in_date, total_open_amount, posting_date, document_type, cust_payment_terms,clear_date, document_create_date, posting_id})=>{
    let data="business_code=" + business_code +"&invoice_currency="+invoice_currency +"&buisness_year="+buisness_year+"&baseline_create_date="+ baseline_create_date +"&area_business="+area_business+"&invoice_id="+invoice_id+"&cust_number="+cust_number+"&doc_id="+doc_id+"&due_in _date="+due_in_date+"&total_open_amount="+total_open_amount
    +"&posting_date="+posting_date+"&document_type="+document_type+"&cust_payment_terms="+cust_payment_terms+"&clear_date="+clear_date+"&document_create_dat"+document_create_date+"&posting_id="+posting_id;
    let response=await axios.get("http://localhost:8080/user_application/Adduser?" + data);
    return response.data;
}
export const Updateuser=async({sl_no,invoice_currency,cust_payment_terms})=>{
    let data="sl_no=" + sl_no + "&invoice_currency="+ invoice_currency + "&cust_payment_terms="+cust_payment_terms;
    let response=await axios.get("http://localhost:8080/user_application/Updateuser?" + data);
    return response.data;

}
export const Deleteuser=async(sl_no)=>{
    let data="sl_no="+sl_no
    console.log(data);
    let response=await axios.get("http://localhost:8080/user_application/Deleteuser?" + data);
    return response.data;

}
export const getSearch = async ({cust_number, doc_id,invoice_id, buisness_year}) => {
    let data ="invoice_id="+invoice_id+"&cust_number="+cust_number+"&doc_id="+doc_id+"&buisness_year="+buisness_year;
    console.log(data);
    let response = await axios.get("http://localhost:8080/user_application/Searchuser?"+data);
    return response.data;
}
export const predict = async (data) => {
    let response = await axios.post('http://127.0.0.1:5000/', data);
    let doc_id = response.data[0].doc_id;
    let aging_bucket = response.data[0].aging_bucket;
    let data1 = "doc_id="+doc_id+"&aging_bucket="+aging_bucket;
    let get = await axios.get("http://localhost:8080/hrcbackend/predict?"+data1)
    return get.data1;
}

