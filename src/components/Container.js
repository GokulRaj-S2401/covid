import React, { useEffect, useState } from 'react'
import './style.css';
import stateAbbr from '../stateAbbr.json';
import Card from './Card/Card';


export default function Container(props) {


  const { lists,searchTerm } = props;
  const [filterItem ,setFilterItem] =  useState([]);
  const [limit,setLimit] = useState(10);
  useEffect(()=>{

    let statesAbbr = Object.values(stateAbbr);
    let state = statesAbbr.filter(item => item.split(' ').join('').toLowerCase().includes(searchTerm.split(' ').join('').toLowerCase()))
    let encode = Object.keys(stateAbbr).find( item => stateAbbr[item] == state );
    
    encode ? lists.map((item,index)=>{
      Object.keys(item).map(key=>{
        if(key==encode){
          setFilterItem([lists[index]])
        }
      })
    }):
    
    setFilterItem(lists.filter((item,i)=>i<=limit));
    console.log(filterItem);

  },[searchTerm,lists,limit]);


  const pageEnd = () =>{
    if(limit<lists.length){
      setLimit(prevState=>prevState+5)
    }
  }

  window.onscroll = ()=>{
    console.log(document.documentElement.offsetHeight);
      //this condition check browser client reach bottom of page or not
      console.log(window.innerHeight);
      if((window.innerHeight + window.scrollY )>= document.body.scrollHeight){
         //pageEnd function increse the page index size
          pageEnd()
          console.log('end');
      }
    }

  return (
    <div className='container' >
          {
            filterItem.length != 0 ? (
              filterItem.map((items,i)=>Object.keys(items).map((item,index)=>{
                return( <Card dateFilter={props.dateFilter} sName = {item} details = { props.dateFilter.length == 0? filterItem[i][item] : props.dateFil[item].dates[props.dateFilter] } key={index}  /> )
             }))
              
            ):
            <h1>Loading</h1>
          }
    </div>
  )
}
