function AddUser({business_code, invoice_currency,buisness_year, baseline_create_date, area_business, invoice_id, cust_number, doc_id, due_in_date, total_open_amount, posting_date, document_type, cust_payment_terms,clear_date, document_create_date, posting_id, changeHandler, clickhandler, closeHandler}){
    return <>
        <form onSubmit={changeHandler}>
            {/* <label>sl_no</label>
            <input name="sl_no" value={sl_no} />
            <label>business_code</label> */}
            <input name="business_code" value={business_code} onChange={changeHandler} />
            <label>business_code</label>
            <input name="buisness_year" value={buisness_year} onChange={changeHandler} />
            <label>buisness_year</label>
            {/* <input name="invoice_curreny" value={invoice_currency} onChange={changeHandler}/> */}
            {/* <label>invoice currency</label> */}
            <input name="baseline_create_date" value={baseline_create_date}onChange={changeHandler} />
            <label>baseline_create_date</label>
            <input name="area_business" value={area_business}onChange={changeHandler} />
            <label>area_business</label>
            <input name="invoice_id" value={ invoice_id}onChange={changeHandler} />
            <label> invoice_id</label>
            <input name="cust_number" value={cust_number} onChange={changeHandler}/>
            <label>cust_number</label>
            <input name="doc_id" value={doc_id} onChange={changeHandler}/>
            <label>doc_id</label>
            <input name="due_in_date" value={due_in_date}onChange={changeHandler} />
            <label>due_in_date</label>
            <input name="total_open_amount" value={total_open_amount}onChange={changeHandler} />
            <label>due_in_date</label>
            <input name="posting_date" value={posting_date}onChange={changeHandler} />
            <label>posting_date</label>
            <input name="document_type" value={document_type}onChange={changeHandler} />
            <label>document_type</label>
            <input name="cust_payment_terms" value={cust_payment_terms}onChange={changeHandler} />
            <label>cust_payment_terms</label>
            <input name="clear_date" value={clear_date} onChange={changeHandler}/>
            <label>clear_date</label>
            <input name="document_create_date" value={document_create_date}onChange={changeHandler} />
            <label>document_create_date</label>
            <input name="posting_id" value={posting_id} onChange={changeHandler}/>
            <label>posting_id</label>
            <input type={"submit"} value={"Adduser"} onclick={clickhandler}/>

        </form>

    </>
}
export default AddUser