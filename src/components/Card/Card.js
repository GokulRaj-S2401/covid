import React, { useEffect, useRef, useState } from 'react'
import './style.css';
import Total  from './Total';
import Delta  from './Delta';
import DeltaS  from './DeltaS';
import Date from './Date';
export default function Card(props) {
    
    const { details,sName } = props;
    const selectOption = useRef();

    const [cardContainer,setCardContainer] = useState('')

    const cardContainerHandler = (arg) =>{
            setCardContainer(arg);
    }

    const [district,setDistrict] = useState('');
    const [filterDe,setFilterDe] = useState('');
    const selectHandler = () =>{
        setDistrict(selectOption.current.value);
    }

    useEffect(()=>{
        if(props.dateFilter.length != 0){
            setCardContainer(props.dateFilter)
        }
        else{
            setCardContainer('')
        }

    },[props.dateFilter])

  return (
    <div>
        {
            details ? (
                <div className='cardContainer' >
                    <div className='cardHeader' >
                        <p> { sName } </p>
                        {
                            props.dateFilter.length == 0?
                        <select onChange={selectHandler} ref={selectOption} >
                        <option value='' >District</option> 
                            {
                            details.districts ?
                                Object.keys(details.districts).map((item,index)=>{
                                    return item !='Unknown' && item  !="Other State" && item !='Airport Quarantine' ?
                                     <option key={item} value={item} >{item}</option>:
                                    ''
                                }):''
                        } 
                        </select>:
                        ''
                        }
                    </div>
                    {
                    cardContainer === ''?
                        <Total cardContainer = {cardContainerHandler} details={details} district={district}  />:
                        cardContainer === 'delta'?
                        <Delta cardContainer = {cardContainerHandler} details={details} district={district}   />:
                        cardContainer === 'delta7'?
                        <DeltaS cardContainer = {cardContainerHandler} details={details} district={district}   />:
                        
                        <Date cardContainer = {cardContainerHandler} details={props.details}  dateFilter={props.dateFilter} />
                        
                    }
                
                </div>
            ):''
        }
    </div>
  )
}


// if((item !="Unknown")){
//     return(
//         <div className='cardContainer' key={index} >
//             <div className='cardHeader' > 
//                  <p>{sName}</p>
//                  <p>{item}</p>    
//             </div>
//              <Total label="Total" data={details.districts.total} />
//         </div>
//      )
// }