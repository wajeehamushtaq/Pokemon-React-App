import { useEffect, useState } from 'react'
import { Table, ColumnDefinition } from 'types'
import './styles.css'

interface PaginationTableProps extends Table {
  columns: ColumnDefinition[]
  handleRedirection: (url: string) => void
}

export default function PaginationTable({ data, columns, count, fetchData, handleRedirection }: PaginationTableProps) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30,
  })

  useEffect(() => {
    fetchData(pagination.pageIndex)
  }, [fetchData, pagination.pageIndex])

  return (
    <div className='p-2'>
      <table className='poke-table'>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessorKey}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        <tbody className='poke-table-body'>
          {data.map((item: any, index: number) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.accessorKey}>
                  {column.accessorKey === 'name' ? (
                    <div onClick={() => handleRedirection(item.url)}>
                      {item[column.accessorKey]}{' '}
                    </div>
                  ) : (
                    item[column.accessorKey]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className='pagination-container'>
        <section className='pagination-btns'>
          <button
            className='pagination-btn'
            onClick={() => setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }))}
            disabled={pagination.pageIndex === 0}
          >
            {'Prev'}
          </button>
          <button
            className='pagination-btn'
            onClick={() => setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }))}
            disabled={(pagination.pageIndex + 1) * pagination.pageSize >= count}
          >
            {'Next'}
          </button>
        </section>
        <section className='pagination-info-container'>
          <span className='pagination-info pagination-text'>
            Page {pagination.pageIndex + 1} of {Math.ceil(count / pagination.pageSize)}
          </span>
        </section>
      </div>
    </div>
  )
}
