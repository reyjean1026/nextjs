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

const Article: NextPage = () =>{
    const [data,setData] = useState([]);
    const [data1,setData1] = useState<any[]>([]);
    const [editMode,setEditMode] = useState(false)
    const [isShown, setIsShown] = useState(false);
    const [InputData,SetInputData] = useState({
        id: "",
        code: "",
        article: "",
        categoryId: ""
    });

    const fetchData = async () => {
        const response = await fetch ('/api/articleapi/getdata');
        const json = await response.json()
        setData(json)
        //console.log(json)
    }

    const fetchData1= async () => {
        const response = await fetch ('/api/categoryapi/getdata');
        const json = await response.json()
        setData1(json)
        //console.log(json)
    }

    const handleCreateData = async (e: React.FormEvent) => {
        e.preventDefault()
        if(editMode){
            handleUpdateData()
        } else{
            const response = await fetch ('/api/articleapi/create',{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    id: InputData.id,
                    code: InputData.code,
                    article: InputData.article,
                    categoryId: InputData.categoryId,
                })
            });
            const json = await response.json()
            SetInputData({id:"",code:"",article:"",categoryId:""})
            fetchData()
        }
    }

    const handleDeleteData = async(id: string) =>{
        const response = await fetch('/api/articleapi/delete',{
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

    const handleEditData = async(id:string,code:string,article: string,categoryId:string) =>{

            setIsShown(true);
            SetInputData({id,code,article,categoryId})
            setEditMode(true)
       
    }

    const handleUpdateData = async () => {
        setIsShown(false);
        const response = await fetch('/api/articleapi/update',{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: InputData.id,
                code: InputData.code,
                article: InputData.article,
                categoryId: InputData.categoryId
            })
        })
        const json = await response.json()
        SetInputData({id:"",code:"",article:"",categoryId:""})
        setEditMode(false)
        fetchData()
    }

    
    const [columnDefs, setColumnDefs] = useState([
        {header: 'ID',field: 'id', hide: true},
        {header: 'Category Name',field: 'category.category_name', filter: true},
        {header: 'Article',field: 'article', filter: true},
        {field: 'Actions',filter: false, cellRendererFramework: (params: { data: { id: string; code: string;article: string,categoryId: string}; }) => <div>
        <button onClick={()=>handleEditData(params.data.id,params.data.code,params.data.article,params.data.categoryId)} className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
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
        fetchData1()
    },[])

    return (
        <>
        <section className="w-full h-[90vh] relative container mx-auto py-20 mt-5 px-3">
            <div className="px-6 h-full text-gray-800">
            <h2 className='text-3xl font-semibold mt-1 mb-4 pb-1'>Article</h2>
         {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <form onSubmit={handleCreateData}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-code" type="text" placeholder="Code" value={InputData.code || ""} onChange={(e)=>SetInputData({...InputData, code: e.target.value})} />
            </div>
            <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                <select id="small" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" onChange={(e)=>SetInputData({...InputData, categoryId: e.target.value})} required>
                    <option selected value="">Select Category</option>
                   {data1.map(data1=>(
                    // eslint-disable-next-line react/jsx-key
                    <option value={data1.id}>{data1.category_name}</option>
                    ))}
                </select>
            </div>
            <div className="w-full md:w-1/5 px-3">
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-categoryname" type="text" placeholder="Article name" value={InputData.article || ""} onChange={(e)=>SetInputData({...InputData, article: e.target.value})} required/>
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

export default Article