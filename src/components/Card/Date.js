import React, { useEffect } from 'react'

export default function Date(props) {

    const {details} = props;
    useEffect(()=>{
        console.log(props);
    })

  return (
    <div>
                <center>{props.dateFilter}</center>
                <div className='stats' >
                    <div className='upperLabel' >
                        <p>Total</p>
                        <p> {details.total ? details.total.confirmed:'data not availabel'}  </p>
                    </div>
                    <div className='' >
                        <progress value={details.total ? details.total.confirmed:0} max={100}></progress>
                    </div>
                    <div className='lowerLabel' >
                        <p></p>
                        <p>confirmed</p>
                    </div>
                </div>
                <div className='stats' >
                    <div className='upperLabel' >
                        <p>Delta</p>
                        <p> {details.delta ? details.delta.confirmed:'data not availabel'} </p>
                    </div>
                    <div className='' >
                        <progress value={details.delta ? details.delta.confirmed :0} max={100}></progress>
                    </div>
                    <div className='lowerLabel' >
                        <p></p>
                        <p>confirmed</p>
                    </div>

                </div>
                <div className='stats' >
                    <div className='upperLabel' >
                        <p>Delta7</p>
                        <p> {details.delta7.confirmed ? details.delta7.confirmed:'data not availabel'}   </p>
                    </div>
                    <div className='' >
                        <progress value={details.delta7.confirmed?details.delta7.confirmed:0} max={100}></progress>
                    </div>
                    <div className='lowerLabel' >
                        <p></p>
                        <p>confirmed</p>
                    </div>
                </div>
            </div>
  )
}
