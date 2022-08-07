import React,{ useState,useEffect,useRef } from 'react';
import Flag from '../../flag.svg';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders,faSortAmountDown,faSortAmountAsc,faSortAmountDesc } from '@fortawesome/free-solid-svg-icons'
import { Outlet,useNavigate } from 'react-router-dom';

export default function Header(props) {
    const navigate = useNavigate();
    const [ orderLabel,setOrderLabel ] = useState('');
    const [ order,setOrder ] = useState(false);
    const [ searchterm,setSearchterm ] = useState('');

    const menus = useRef();
    const searchField = useRef();
    const selectRef = useRef();
    
    const [dataFilters,setDateFilter] = useState('')

    const orderSelection = (arg) =>{
        if(arg === orderLabel){
            setOrder(!order)
        }
        else{
            setOrderLabel(arg)
            setOrder(true)
        }

        props.setSortasc(arg,order?'dsc':'asc')
        navigate('/home')
        console.log('click');
    }

    useEffect(()=>{
        window.addEventListener('click',(e)=>{
            try{

                if(!e.target.className.includes('menu')){
                    menus.current.style.display='none';
                }
                
            }
            catch{
                // menus.current.style.display='block';
                console.log('clicked')
            }
        })

        fetch('https://data.covid19india.org/v4/min/timeseries.min.json')
        .then(res=>res.json())
        .then((data)=>{
        
           let d = Object.keys(data).map(item=>Object.keys(data[item].dates))
            setDateFilter(d[0])
            props.setFilterItem(data)
        })

    },[]);

    const searchHandler = () =>{
        setSearchterm(searchField.current.value);
        props.setSearchTerm(searchField.current.value);
    }

  return (
    <div>
    <header>
        <div className='firstRow' > 
            <p>Covid Tracker</p>
            <img src={Flag} alt="India" />
        </div>
        <div className='secondRow' >
            <div className='search' >
                <p className='state' >States</p>
                <input className='slist' onChange={()=>searchHandler()} value={searchterm}  ref={searchField} type="text" placeholder='Find your state here' />
            </div>
            <div className='filters' >
                <select ref={selectRef} onChange={()=>props.dateFilter(selectRef.current.value)} >
                    <option value='' >date filter</option>
                    {
                        dataFilters ? dataFilters.map((item,index)=><option key={index} value={item} >{item}</option>):''
                    }
                </select>
                <div className='sort' >
                    <button onClick={()=>menus.current.style.display = 'block'} className='iconBtn mspace' >
                        <FontAwesomeIcon icon={faSortAmountDown} />
                    </button>
                    <div className='sortOptions' ref={menus} >
                        <ul>
                            <li onClick={()=>orderSelection('confirmed')} className={(orderLabel === 'confirmed' ? 'menu active' : 'menu') } >
                                <span className='menu' > Confirmed Cases </span>
                                <FontAwesomeIcon className='menu' icon={( (order) && (orderLabel === 'confirmed')?faSortAmountAsc:faSortAmountDesc)} />
                            </li>
                            <li onClick={()=>orderSelection('affected')} className={(orderLabel === 'affected' ? 'menu active' : 'menu') } >
                                <span className='menu' > Affected Percentage </span>
                                <FontAwesomeIcon className='menu' icon={(order && orderLabel === 'affected' ?faSortAmountAsc:faSortAmountDesc)} />
                            </li>
                            <li onClick={()=>orderSelection('vaccinated')} className={(orderLabel === 'vaccinated' ? 'menu active' : 'menu') } >
                                <span className='menu' > Vaccinated Percentage </span>
                                <FontAwesomeIcon className='menu' icon={(order && orderLabel === 'vaccinated' ?faSortAmountAsc:faSortAmountDesc)} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <main>
        <Outlet />
    </main>
    </div>
  )
}
