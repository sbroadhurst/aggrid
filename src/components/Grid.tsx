import React, { useState, useEffect, MouseEvent } from 'react'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'ag-grid-enterprise'

const Grid = () => {
  // const [gridApi, setGridApi] = useState(null)
  // const [gridColumnApi, setGridColumnApi] = useState(null)

  const [rowData, setRowData] = useState([])

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=4d6322cf6a2b7554c7e6ffbaec593010&language=en-US&page=1')
      .then((result) => result.json())
      .then((rowData) => {
        rowData.results.forEach((movie: any) => {
          movie.poster_path = `http://image.tmdb.org/t/p/w185/${movie.poster_path}`
        })
        setRowData(rowData.results)
      })
  }, [])

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 400, width: 800, paddingBottom: 20 }}>
        <AgGridReact rowData={rowData} rowSelection="multiple">
          <AgGridColumn field="title" sortable={true} filter={true} checkboxSelection={true}></AgGridColumn>
          <AgGridColumn
            field="poster_path"
            headerName="Poster"
            cellRenderer={(params) => `<img src=${params.value} alt =''/>`}></AgGridColumn>
          <AgGridColumn field="vote_average" headerName="User Rating" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn
            field="original_language"
            headerName="Original Language"
            sortable={true}
            filter={true}></AgGridColumn>
        </AgGridReact>
      </div>

      {/* grouped table*/}
      <div className="ag-theme-alpine" style={{ height: 800, width: 800 }}>
        <AgGridReact
          rowData={rowData}
          rowSelection="multiple"
          groupSelectsChildren={true}
          autoGroupColumnDef={{
            headerName: 'Original Language',
            field: 'original_language',
            cellRenderer: 'agGroupCellRenderer',
            cellRendererParams: {
              checkbox: true,
            },
          }}>
          <AgGridColumn field="title" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn
            field="poster_path"
            headerName="Poster"
            cellRenderer={(params) => `<img src=${params.value} alt =''/>`}></AgGridColumn>
          <AgGridColumn field="vote_average" headerName="User Rating" sortable={true} filter={true}></AgGridColumn>

          <AgGridColumn
            field="original_language"
            headerName="Original Language"
            sortable={true}
            filter={true}
            rowGroup={true}
            hide></AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  )
}

export default Grid
