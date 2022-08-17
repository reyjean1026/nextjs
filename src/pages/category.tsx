import type {NextPage} from "next"
import React, { useState, useRef, useEffect, useMemo, useCallback, Component} from 'react';
import { requireAuth } from "../common/requireAuth";
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Category: NextPage = () =>{
    const [data,setData] = useState([]);
    const [editMode,setEditMode] = useState(false)
    const [isShown, setIsShown] = useState(false);
    const [InputData,SetInputData] = useState({
        id: "",
        code: "",
        category_name: "",
    });



    const fetchData = async () => {
        const response = await fetch ('/api/categoryapi/getdata');
        const json = await response.json()
        setData(json)
        //console.log(json)
    }

    const handleCreateData = async (e: React.FormEvent) => {
        e.preventDefault()
        if(editMode){
            handleUpdateData()
        } else{
            const response = await fetch ('/api/categoryapi/create',{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    id: InputData.id,
                    code: InputData.code,
                    category_name: InputData.category_name,
                })
            });
            const json = await response.json()
            SetInputData({id:"",code:"",category_name:""})
            fetchData()
        }
    }

    const handleDeleteData = async(id: string) =>{
        const response = await fetch('/api/categoryapi/delete',{
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

    const handleEditData = async(id:string,code:string,category_name: string) =>{

            setIsShown(true);
            //setIsShown1(false);
            SetInputData({id,code,category_name})
            setEditMode(true)
       
    }


    const handleUpdateData = async () => {
        setIsShown(false);
        const response = await fetch('/api/categoryapi/update',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: InputData.id,
                code: InputData.code,
                category_name: InputData.category_name
            })
        })
        const json = await response.json()
        SetInputData({id:"",code:"",category_name:""})
        setEditMode(false)
        fetchData()
    }

    const [columnDefs, setColumnDefs] = useState([
        {header: 'ID',field: 'id', hide: true},
        {header: 'Code',field: 'code', editable:true, filter: true},
        {header: 'Category Name',field: 'category_name', editable:true, filter: true},
        {field: 'Actions',filter: false, cellRendererFramework: (params: { data: { id: string; code: string;category_name: string}; }) => <div>
        <button onClick={()=>handleEditData(params.data.id,params.data.code,params.data.category_name)} className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
        <i className="fas fa-heart"></i>Edit</button>
        <button onClick={()=>handleDeleteData(params.data.id)} className="bg-rose-500 text-white active:bg-rose-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
        <i className="fas fa-heart"></i>Delete</button>
      </div>},
      ]);

       // DefaultColDef sets props common to all Columns
        const defaultColDef = {
            sortable: true,
            flex: 1, filter: true,
            floatingFilter: true
        }
            

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <>
        <section className="w-full h-[90vh] relative container mx-auto py-20 mt-5 px-3">
            <div className="px-6 h-full text-gray-800">
            <h2 className='text-3xl font-semibold mt-1 mb-4 pb-1'>Category</h2>
         {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
         {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <form onSubmit={handleCreateData}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-code" type="text" placeholder="Code" value={InputData.code || ""} onChange={(e)=>SetInputData({...InputData, code: e.target.value})} required/>
            </div>
            <div className="w-full md:w-1/5 px-3">
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-categoryname" type="text" placeholder="Category name" value={InputData.category_name || ""} onChange={(e)=>SetInputData({...InputData, category_name: e.target.value})} required/>
            </div>
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

export default Category