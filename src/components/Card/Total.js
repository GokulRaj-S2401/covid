
import React, { useEffect, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft,faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


export default function Total(props) {

    const { district,details } = props;
    const [data,setData] = useState([]);
    useEffect(()=>{
        if(district.length >1){
            Object.keys(details.districts).map((item,index)=>{
                let pack = []
                if(item === district){
                    pack.push({label:'Total - '+district,
                    total:details.districts[item].total?details.districts[item].total:'',
                })
                setData(pack)
                }
            console.log(pack)
            })
        }
        else{
            let pack = []
            pack.push({label:'Total',total:details.total})
            setData(pack)
        }
    },[district])
    
    if(data.length !=0 ){
        return (
            <div>
                <center>{data[0].label}</center>
                <div className='stats' >
                    <div className='upperLabel' >
                        <p>Confirmed</p>
                        <p> {data[0].total.confirmed ? Math.floor((data[0].total.confirmed/data[0].total.tested)*100):'data not availabel'} % </p>
                        <p> {data[0].total.confirmed ? data[0].total.confirmed + '/' + data[0].total.tested :'not availabel'} </p>
                    </div>
                    <div className='' >
                        <progress value={data[0].total ? Math.floor((data[0].total.confirmed/data[0].total.tested)*100):0} max={100}></progress>
                    </div>
                    <div className='lowerLabel' >
                        <p></p>
                        <p>confirmed/tested</p>
                    </div>
                </div>
                <div className='stats' >
                    <div className='upperLabel' >
                        <p>Recovered</p>
                        <p> {data[0].total.recovered ? Math.floor((data[0].total.recovered/data[0].total.confirmed)*100):'data not availabel'} %  </p>
                        <p> {data[0].total.recovered ? data[0].total.recovered + '/' + data[0].total.confirmed :'not availabel'} </p>
                    </div>
                    <div className='' >
                        <progress value={data[0].total.recovered ? Math.floor((data[0].total.recovered/data[0].total.confirmed)*100):0} max={100}></progress>
                    </div>
                    <div className='lowerLabel' >
                        <p></p>
                        <p>recovered/confirmed</p>
                    </div>

                </div>
                <div className='stats' >
                    <div className='upperLabel' >
                        <p>Deceased</p>
                        <p> {data[0].total.deceased ? ((data[0].total.deceased/data[0].total.confirmed)*100).toFixed(2):'data not availabel'} %  </p>
                        <p> {data[0].total.deceased ? data[0].total.deceased + '/' + data[0].total.confirmed :'not availabel'} </p>
                    </div>
                    <div className='' >
                        <progress value={data[0].total.deceased ? Math.floor((data[0].total.deceased/data[0].total.confirmed)*100):0} max={100}></progress>
                    </div>
                    <div className='lowerLabel' >
                        <p></p>
                        <p>deceased/confirmed</p>
                    </div>
                </div>
                <div className='arrows' >
                    <FontAwesomeIcon className='arrow' icon={faArrowLeft} style={{visibility:'hidden'}} />
        
                    <FontAwesomeIcon onClick={()=>props.cardContainer('delta')} className='arrow'  icon={faArrowRight} />
                </div>
            </div>
        )
    }
}


