package com.highradius.training;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;


/**
 * Servlet implementation class addUser
 */
@WebServlet("/Adduser")
public class Adduser extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Adduser() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		try {
			String business_code = request.getParameter("business_code");
			String buisness_year = request.getParameter("buisness_year");
			String baseline_create_date = request.getParameter("baseline_create_date");
			String area_business = request.getParameter("area_business");
			String invoice_id = request.getParameter("invoice_id");
			String cust_number = request.getParameter("cust_number");
			String doc_id = request.getParameter("doc_id");
			
			String due_in_date = request.getParameter("due_in_date");
			//String due_in_date = request.getParameter("due_in_date");
			String total_open_amount = request.getParameter("total_open_amount");
			String posting_date = request.getParameter("posting_date");
			String document_type = request.getParameter("document_type");
			String cust_payment_terms = request.getParameter("cust_payment_terms");
			
			HashMap<Object, Object> Response = new HashMap<Object, Object>();
			
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/grey_goose","root","Vijay@2001");
			String query = "INSERT INTO winter_internship(business_code,buisness_year,baseline_create_date,invoice_id,"
					+ "cust_number,doc_id,due_in_date,total_open_amount,posting_date,document_type,cust_payment_terms) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
			PreparedStatement ps = connection.prepareStatement(query);
			
			
			ps.setString(1, business_code);
			ps.setString(2, buisness_year);
			//ps.setDate(3, (Date) baseline_create_date);
			if (baseline_create_date==""|| baseline_create_date==null) 
			{
				ps.setNull(3,Types.DATE);
			}
			else
			{
				java.util.Date utilDate = new SimpleDateFormat("dd-MMM-yyyy").parse(baseline_create_date);
				ps.setDate(3,new java.sql.Date(utilDate.getTime()));
			}
			
			if (invoice_id=="" || invoice_id==null) 
			{
				ps.setNull(4,Types.INTEGER);
			}
			else
			{
				ps.setInt(4,Integer.parseInt(invoice_id));
			}
			
			if (cust_number==""|| cust_number==null) 
			{
				ps.setNull(5,Types.INTEGER);
			}
			else
			{
				ps.setInt(5,Integer.parseInt(cust_number));
			}
			ps.setString(6, doc_id);
			//ps.setDate(8, (Date) due_in_date);
			if (due_in_date==""|| due_in_date==null) 
			{
				ps.setNull(7,Types.DATE);
			}
			else
			{
				java.util.Date utilDate = new SimpleDateFormat("dd-MMM-yyyy").parse(due_in_date);
				ps.setDate(7,new java.sql.Date(utilDate.getTime()));
			}
			if (total_open_amount==""|| total_open_amount==null) 
			{
				ps.setNull(8,Types.FLOAT);
			}
			else
			{
				ps.setFloat(8,Float.parseFloat(cust_number));
			}
			//ps.setString(10, posting_date);
			if (posting_date==""|| posting_date==null) 
			{
				ps.setNull(9,Types.DATE);
			}
			else
			{
				java.util.Date utilDate = new SimpleDateFormat("dd-MMM-yyyy").parse(posting_date);
				ps.setDate(9,new java.sql.Date(utilDate.getTime()));
			}
			
			ps.setString(10, document_type);
			ps.setString(11, cust_payment_terms);
			
			if(ps.executeUpdate() > 0) {
				Response.put("insert", true);
			}else {
				Response.put("insert", false);
			}	
			
			Gson gson = new Gson();
			String JSONresponse = gson.toJson(Response);
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.getWriter().append(JSONresponse);
	
		}catch(Exception e) {
			e.printStackTrace();
		}
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
