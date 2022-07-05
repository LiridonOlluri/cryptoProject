import React, { useEffect, useState } from 'react';
import './App.css';
import { Chart as ChartJS, registerables,Filler, DecimationAlgorithm } from 'chart.js';
import { Line } from 'react-chartjs-2'
import { CryptoData as initialCryptoData } from './data'
ChartJS.register(...registerables);

function App() {
    const savedCryptoData__string = localStorage.getItem("_<Multifarm>_data");
    const savedCryptoData = savedCryptoData__string ? JSON.parse(savedCryptoData__string) : false
    const [ CryptoData, setCryptoData ] = useState(savedCryptoData || initialCryptoData)
    // useEffect(()=>{

    //   const newCryptoData = [
    //     ...CryptoData,
    //     {
    //       percentage:15.10,
    //       month:"Feb 12",
    //       amounts:25,
    //   },
    //   ]
    //   setCryptoData(newCryptoData);
    // },[])
  

  useEffect(() => {
    const interval = setInterval(() => {
      CryptoData.shift();
      const lastItem = CryptoData[CryptoData.length - 1];
      const percentage = lastItem ? lastItem.percentage + (lastItem.percentage * 5) /100 : 1;
      const month = lastItem ? lastItem.month + 1:1
      
      const newCryptoData = [
        ...CryptoData,
        {
          percentage: percentage,
          month:month,
          amounts:25,
      },
      ]
      setCryptoData(newCryptoData);
      
      localStorage.setItem('_<Multifarm>_data', JSON.stringify(newCryptoData));
      
    }, 1000 * 60 * 60);
    return () => clearInterval(interval)
  })
const [asset, setAsset]:any = useState([])

const [userData, setUserData] = useState({

  labels:CryptoData.map((data: any) => data.month +" July"),

  datasets:[{
    label:"Asset APR(y) ",
    data:CryptoData.map((data: any) =>data.percentage),
    backgroundColor:["Purple"],
    borderColor:["purple"],
    tension:0.2,
   
  },
],
});
useEffect(() => {
  setUserData(
    {
      labels:CryptoData.map((data: any) => data.month + " July"),
    
      datasets:[{
        label:"Asset APR(y) ",
        data:CryptoData.map((data: any) =>data.percentage),
        backgroundColor:["Purple"],
        borderColor:["purple"],
        tension:0.2,
       
      },
    ],
    }
  )
}, [ CryptoData ])

const [userAnotherData, setAnotherUserData] = useState({

  labels:CryptoData.map((data: any) => data.month),

  datasets:[{
    label:"Asset TVL) ",
    data:CryptoData.map((data: any) =>data.amounts),
    backgroundColor:["Purple"],
    borderColor:["purple"],
    tension:0.2,
   
  },
],



});
       
  useEffect(()=>{
    fetch("https://api.multifarm.fi/jay_flamingo_random_6ix_vegas/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=")
    .then(res => res.text())
    .then(text => {
    const object = eval("(" + text + ")")
    const json = JSON.stringify(object);
    const data = JSON.parse(json)
    // console.log({ object, json, data })
    // console.log(data.data)
    // const dataAsset = data.data;
     
   

    setAsset(object.data.map((obj:any) => obj.assetId))

      
})
  }, []);


  // find asset"Hackerdao-WBNB"
  let result = undefined;
  const found = asset.find((x:any) => x== "Hackerdao-WBNB=");
  if(found){
    result = (<div><h2>{found}</h2></div>)
  }else{
    result = ( <div><h2>NOT FOUND</h2></div>)
  }
 
  return (
          


      <div className='center_container'>
            <div className='task1'>
              <p> asset "assetId": asset": "Hackerdao-WBNB":</p>
                 <h2>  
                    {result}
                 </h2>
            </div>
           <h1> Asset APR(y) </h1>
         <Line 
            data={userData}
            style={{ width: "30%", height: "40%" }}>
          </Line>


          <h1> Asset TVL </h1>
         <Line 
            data={userAnotherData}
            style={{ width: "30%", height: "40%" }}>
          </Line>
                     
          
                   
                    
                       
                        
                       
      </div>
      
  );
}

export default App;
