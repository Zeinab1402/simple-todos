import { useDispatch, useSelector } from "react-redux"
import { StatusFilters , changeStatusesFilter,selectedStatusFilter } from "../filter/filterSlice"



const StatusFilter = () => {
    const status = useSelector(selectedStatusFilter)
    const dispatch = useDispatch()
    const renderedFilters = Object.keys(StatusFilters).map((key) => {
        const value = StatusFilters[key]
        const className = value === status ? 'selected' : ''
        const changeStatus=()=>{
            dispatch(changeStatusesFilter(value))
        }
        return (
            <li key={value}>
                <button 
                onClick={changeStatus}
                className={className}>
                    {key}
                </button>
            </li>
        )
    })

    return (
        <div className="filters statusFilters">
            <h5>Filter by Status</h5>
            <ul>{renderedFilters}</ul>
        </div>
    )
}

export default StatusFilter