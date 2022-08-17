import type {NextPage} from "next"
import React, { useState, useRef, useEffect, useMemo, useCallback, Component} from 'react';
import { requireAuth } from "../common/requireAuth";
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { notStrictEqual } from "assert";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Inventory: NextPage = () =>{
    const [data,setData] = useState([]);
    const [data1,setData1] = useState<any[]>([]);
    const [data2,setData2] = useState<any[]>([]);
    const [editMode,setEditMode] = useState(false)
    const [isShown, setIsShown] = useState(false);
    const [selected, setSelected] = useState([]);
    const [InputData,SetInputData] = useState({
        id: "",
        articleId : "",
        description: "",
        date_acquired: "", 
        property_number: "",
        quantity: "",
        unit_value: "",
        received_date: "",
        registered_status: "",
        temp_name: "",
        status: "",
        attachment: "",
        remarks: "",
        pipSid : "",
    });

    const fetchData = async () => {
        const response = await fetch ('/api/inventoryapi/getdata');
        const json = await response.json()
        setData(json)
        //console.log(json)
    }

    const fetchData1= async () => {
        const response = await fetch ('/api/articleapi/getdata');
        const json = await response.json()
        setData1(json)
        //console.log(json)
    }

    const fetchData2= async () => {
        const response = await fetch ('/api/pipapi/getdata');
        const json = await response.json()
        setData2(json)
        //console.log(json)
    }

    const handleCreateData = async (e: React.FormEvent) => {
        e.preventDefault()
        if(editMode){
            handleUpdateData()
        } else{
            const response = await fetch ('/api/inventoryapi/create',{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    id: InputData.id,
                    articleId: InputData.articleId,
                    description: InputData.description,
                    date_acquired: InputData.date_acquired, 
                    property_number: InputData.property_number,
                    quantity: InputData.quantity,
                    unit_value: InputData.unit_value,
                    received_date: InputData.received_date,
                    registered_status: InputData.registered_status,
                    temp_name: InputData.temp_name,
                    status: InputData.status,
                    attachment: InputData.attachment,
                    remarks: InputData.remarks,
                    pipSid : InputData.pipSid,
                })
            });
            const json = await response.json()
            SetInputData({id:"",articleId:"",description:"",date_acquired:"",property_number:"",quantity:"",unit_value:"",received_date:"",registered_status:"",temp_name:"",status:"",attachment:"",remarks:"",pipSid:""})
            fetchData()
        }
    }

    const handleDeleteData = async(id: string) =>{
        const response = await fetch('/api/inventoryapi/delete',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id})
        })
        const json = await response.json()
        console.log(json)
        fetchData()
    }

    const handleEditData = async(id:string,articleId:string,description:string,date_acquired:string,property_number:string,quantity:string,unit_value:string,received_date:string,registered_status:string,temp_name:string,status:string,attachment:string,remarks:string,pipSid:string) =>{

            setIsShown(true);
            SetInputData({id,articleId,description,date_acquired,property_number,quantity,unit_value,received_date,registered_status,temp_name,status,attachment,remarks,pipSid})
            setEditMode(true)
       
    }

    const handleUpdateData = async () => {
        setIsShown(false);
        const response = await fetch('/api/inventoryapi/update',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: InputData.id,
                articleId: InputData.articleId,
                description: InputData.description,
                date_acquired: InputData.date_acquired, 
                property_number: InputData.property_number,
                quantity: InputData.quantity,
                unit_value: InputData.unit_value,
                received_date: InputData.received_date,
                registered_status: InputData.registered_status,
                temp_name: InputData.temp_name,
                status: InputData.status,
                attachment: InputData.attachment,
                remarks: InputData.remarks,
                pipSid : InputData.pipSid,
            })
        })
        const json = await response.json()
        SetInputData({id:"",articleId:"",description:"",date_acquired:"",property_number:"",quantity:"",unit_value:"",received_date:"",registered_status:"",temp_name:"",status:"",attachment:"",remarks:"",pipSid:""})
        setEditMode(false)
        fetchData()
    }

    
    const [columnDefs, setColumnDefs] = useState([
        {header: 'ID',field: 'id', hide: true},
        {headerName: 'Category Name', minWidth: 300,field: 'article.category.category_name', filter: true},
        {headerName: 'Article',minWidth: 250,field: 'article.article', filter: true},
        {headerName: 'Description',minWidth: 300,field: 'description', filter: true},
        {headerName: 'Date Acquired',minWidth: 200,field: 'date_acquired', filter: true},
        {headerName: 'Property Number',minWidth: 200,field: 'property_number', filter: true},
        {headerName: 'Unit of Measure',minWidth: 150,field: 'quantity', filter: true},
        {headerName: 'Unit Value',minWidth: 250,field: 'unit_value', filter: true},
        {headerName: 'Total',minWidth: 250,field: '', filter: true},
        {headerName: 'Registered?',minWidth: 100,field: 'registered_status', filter: true},
        {headerName: 'Assigned To',minWidth: 200,field: 'pip.name_f', filter: true},
        {headerName: 'Temp Name',minWidth: 200,field: 'temp_name', filter: true},
        {headerName: 'Status',minWidth: 200,field: 'status', filter: true},
        {headerName: 'Attachment',minWidth: 200,field: 'attachment', filter: true},
        {headerName: 'Remarks',minWidth: 300,field: 'remarks', filter: true},
        {field: 'Actions',minWidth: 200,filter: false, cellRendererFramework: (params: { data: {id:string,articleId:string,description:string,date_acquired:string,property_number:string,quantity:string,unit_value:string,received_date:string,registered_status:string,temp_name:string,status:string,attachment:string,remarks:string,pipSid:string}; }) => <div>
        <button onClick={()=>handleEditData(params.data.id,params.data.articleId,params.data.description,params.data.date_acquired,params.data.property_number,params.data.quantity,params.data.unit_value,params.data.received_date,params.data.registered_status,params.data.temp_name,params.data.status,params.data.attachment,params.data.remarks,params.data.pipSid)} className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
        <i className="fas fa-heart"></i>Edit</button>
        <button onClick={()=>handleDeleteData(params.data.id)} className="bg-rose-500 text-white active:bg-rose-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
        <i className="fas fa-heart"></i>Delete</button>
      </div>},
      ]);

       // DefaultColDef sets props common to all Columns
        const defaultColDef = {
            sortable: true,
            flex: 1, filter: true,
            floatingFilter: true,
            resizable: true,
            minWidth: 100,
        }
            
    useEffect(()=>{
        fetchData()
        fetchData1()
        fetchData2()
    },[])

    return (
        <>
        <section className="w-full relative container mx-auto py-20 mt-5 px-3">
            <div className="px-6 h-full text-gray-800">
            <h2 className='text-3xl font-semibold mt-1 mb-4 pb-1'>Article</h2>
         {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <form onSubmit={handleCreateData}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                <select id="small" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" onChange={(e)=>SetInputData({...InputData, articleId: e.target.value})} required>
                    <option selected value="">Select Article</option>
                    {data1.map(data1=>(
                    // eslint-disable-next-line react/jsx-key
                    <option value={data1.id}>{data1.category.code}-{data1.article}</option>
                    ))}
                
                </select>
            </div>
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                <select id="small" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" onChange={(e)=>SetInputData({...InputData, registered_status: e.target.value})} required>
                    <option selected value="">Registered Employee?</option>
                    <option selected value="YES">YES</option>
                    <option selected value="NO">NO</option>
                </select>
            </div>
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                
                <select id="small" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" onChange={(e)=>SetInputData({...InputData, pipSid: e.target.value})} required>
                    <option selected value="">Assigned to</option>
                   {data2.map(data2=>(
                    // eslint-disable-next-line react/jsx-key
                    <option value={data2.sid}>{data2.name_l}, {data2.name_f} {data2.name_m}</option>
                    ))}
                </select>
            </div>
            <div className="w-full md:w-1/5 px-3">
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-categoryname" type="text" placeholder="Assigned to" value={InputData.temp_name || ""} onChange={(e)=>SetInputData({...InputData, temp_name: e.target.value})} required/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/1 px-3">
              <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-categoryname" placeholder="Description" value={InputData.description || ""} onChange={(e)=>SetInputData({...InputData, description: e.target.value})} required/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">   
            <div className="w-full md:w-1/4 px-3">
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-categoryname" type="date" value={InputData.date_acquired || ""} onChange={(e)=>SetInputData({...InputData, date_acquired: e.target.value})} required/>
            </div>
            <div className="w-full md:w-1/4 px-3">
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-categoryname" type="text" placeholder="Property Number" value={InputData.property_number || ""} onChange={(e)=>SetInputData({...InputData, property_number: e.target.value})} required/>
            </div>
            <div className="w-full md:w-1/4 px-3">
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-categoryname" type="number" placeholder="Quantity" value={InputData.quantity || ""} onChange={(e)=>SetInputData({...InputData, quantity: e.target.value})} required/>
            </div>
            <div className="w-full md:w-1/4 px-3">
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-categoryname" type="number" placeholder="Unit Value" value={InputData.unit_value || ""} onChange={(e)=>SetInputData({...InputData, unit_value: e.target.value})} required/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">   
            <div className="w-full md:w-1/4 px-3">
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-categoryname" type="date" value={InputData.received_date || ""} onChange={(e)=>SetInputData({...InputData, received_date: e.target.value})} required/>
            </div>
            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <select id="small" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" onChange={(e)=>SetInputData({...InputData, status: e.target.value})} required>
                    <option selected value="">Equiment Status</option>
                    <option value="SERVICIABLE">SERVICIABLE</option>
                    <option value="UNSERVICIABLE">UNSERVICIABLE</option>
                    <option value="WASTE">WASTE</option>
                </select>
            </div>
            <div className="w-full md:w-2/4 px-3">
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-categoryname" type="file" placeholder="file" value={InputData.attachment || ""} onChange={(e)=>SetInputData({...InputData, attachment: e.target.value})} />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/1 px-3">
              <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-categoryname" placeholder="Remarks" value={InputData.remarks || ""} onChange={(e)=>SetInputData({...InputData, remarks: e.target.value})}/>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            {isShown && (
                <div className="w-full md:w-1/5 px-3">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded items-center" type="submit" data-modal-toggle="popup-modal">Edit Button</button>
                </div>
            )}
            {!isShown && (
                <div className="w-full md:w-1/5 px-3">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded items-center" type="submit" data-modal-toggle="popup-modal">Add Button</button>
                </div>
            )}
          </div>
        </form>
         
            <div className="ag-theme-alpine" style={{height: 500}}>
        
                <AgGridReact
                    //ref={gridRef} // Ref for accessing Grid's API
            
                    rowData={data} // Row Data for Rows
            
                    columnDefs={columnDefs} // Column Defs for Columns
                    defaultColDef={defaultColDef} // Default Column Properties  
                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    rowSelection='multiple' // Options - allows click selection of rows
            
                    //onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                    />
            </div>
        </div>
    </section>
          <br></br>
        </>
      )
}

export default Inventory