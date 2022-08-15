import type {NextPage} from "next"
import React, { useState, useRef, useEffect, useMemo, useCallback, Component} from 'react';
import { requireAuth } from "../common/requireAuth";
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Service: NextPage = () =>{
    const [data,setData] = useState([]);
    const [editMode,setEditMode] = useState(false)
    const [InputData,SetInputData] = useState({
        sid: "",
        name_f: "",
        name_m: "",
        name_l: ""
    });

    const fetchData = async () => {
        const response = await fetch ('/api/getdata');
        const json = await response.json()
        setData(json)
        //console.log(json)
    }

    const handleCreateData = async (e: React.FormEvent) => {
        e.preventDefault()
        if(editMode){
            handleUpdateData()
        } else{
            const response = await fetch ('/api/create',{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    sid: InputData.sid,
                    name_f: InputData.name_f,
                    name_m: InputData.name_m,
                    name_l: InputData.name_l
                })
            });
            const json = await response.json()
            SetInputData({sid:"",name_f:"",name_m:"",name_l:""})
            fetchData()
        }
    }

    const handleDeleteData = async(sid: string) =>{
        const response = await fetch('/api/delete',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({sid})
        })
        const json = await response.json()
        console.log(json)
        fetchData()
    }

    const handleEditData = async(sid: string, name_f: string, name_m: string, name_l: string) =>{
        //const response = await fetch('/api/update',{
            /*method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({sid})*/
            SetInputData({sid,name_f,name_m,name_l})
            setEditMode(true)
        //})
        /*const json = await response.json()
        console.log(json)
        fetchData()*/
    }

    const handleUpdateData = async () => {
        const response = await fetch('/api/update',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sid: InputData.sid,
                name_f: InputData.name_f,
                name_m: InputData.name_m,
                name_l: InputData.name_l
            })
        })
        const json = await response.json()
        SetInputData({sid:"",name_f:"",name_m:"",name_l:""})
        setEditMode(false)
        fetchData()
    }

    
    const [columnDefs, setColumnDefs] = useState([
        {field: 'sid', filter: true},
        {field: 'name_f', filter: true},
        {field: 'name_m', filter: true},
        {field: 'name_l', filter: true},
        {field: 'Actions', cellRendererFramework: (params: { data: { sid: string; name_f: string; name_m: string; name_l: string; }; }) => <div>
        <button onClick={()=>handleEditData(params.data.sid,params.data.name_f,params.data.name_m,params.data.name_l)} className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
        <i className="fas fa-heart"></i>Edit</button>
        <button onClick={()=>handleDeleteData(params.data.sid)} className="bg-rose-500 text-white active:bg-rose-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
        <i className="fas fa-heart"></i>Delete</button>
      </div>},
      ]);

       // DefaultColDef sets props common to all Columns
        const defaultColDef = useMemo( ()=> ({
            sortable: true,
            flex: 1, filter: true,
            floatingFilter: true
        }),[]);

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <>
          <section className="w-full h-[90vh] relative container mx-auto py-20 mt-5 px-3">
            <div className="px-6 h-full text-gray-800">
            <h2 className='text-3xl font-semibold mt-1 mb-4 pb-1'>Services</h2>
         {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <form onSubmit={handleCreateData}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-id" type="text" placeholder="ID" value={InputData.sid || ""} onChange={(e)=>SetInputData({...InputData, sid: e.target.value})}/>
            </div>
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="First Name" value={InputData.name_f || ""} onChange={(e)=>SetInputData({...InputData, name_f: e.target.value})}/>
            </div>
            <div className="w-full md:w-1/5 px-3">
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-middle-name" type="text" placeholder="Middle Name" value={InputData.name_m || ""} onChange={(e)=>SetInputData({...InputData, name_m: e.target.value})}/>
            </div>
            <div className="w-full md:w-1/5 px-3">
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Last Name" value={InputData.name_l || ""} onChange={(e)=>SetInputData({...InputData, name_l: e.target.value})}/>
            </div>
            <div className="w-full md:w-1/5 px-3">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded items-center" type="submit" data-modal-toggle="popup-modal">Add Button</button>
            </div>
          </div>
        </form>
         
         <div className="ag-theme-alpine" style={{height: 700}}>
    
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
    
        </>
      )
}

export default Service