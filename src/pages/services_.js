
import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';

import { requireAuth } from "../common/requireAuth";
import { prisma } from '../common/prisma';

import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

export const getServerSideProps = requireAuth(async (ctx) => {
  const pip = await prisma.pip.findMany()
  return {
    props: { pip}
  }

});

const services = ({pip}) => {

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(pip); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
 const [columnDefs, setColumnDefs] = useState([
  {field: 'sid', filter: true},
  {field: 'name_f', filter: true},
  {field: 'name_m', filter: true},
  {field: 'name_l', filter: true},
]);

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({
  sortable: true,
  flex: 1, filter: true,
  floatingFilter: true
}));

// Example of consuming Grid Event
const cellClickedListener = useCallback( event => {
console.log('cellClicked', event);
}, []);

  return (
    <>
      <section className="container mx-auto">
        <div className="px-6 h-full text-gray-800">
        <h2 className='text-3xl font-semibold mt-1 mb-12 pb-1'>Services</h2>
     {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
    <form>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/5 px-3 mb-6 md:mb-0">
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-id" type="text" placeholder="ID"/>
        </div>
        <div class="w-full md:w-1/5 px-3 mb-6 md:mb-0">
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="First Name"/>
        </div>
        <div class="w-full md:w-1/5 px-3">
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-middle-name" type="text" placeholder="Middle Name"/>
        </div>
        <div class="w-full md:w-1/5 px-3">
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Last Name"/>
        </div>
        <div class="w-full md:w-1/5 px-3">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded items-center" type="button" data-modal-toggle="popup-modal">Add Button</button>
        </div>
      </div>
    </form>
     
     <div className="ag-theme-alpine" style={{height: 700}}>

       <AgGridReact
           ref={gridRef} // Ref for accessing Grid's API

           rowData={rowData} // Row Data for Rows

           columnDefs={columnDefs} // Column Defs for Columns
           defaultColDef={defaultColDef} // Default Column Properties

           animateRows={true} // Optional - set to 'true' to have rows animate when sorted
           rowSelection='multiple' // Options - allows click selection of rows

           onCellClicked={cellClickedListener} // Optional - registering for Grid Event
           />
     </div>
        </div>
      </section>

    </>
  )
}



export default services