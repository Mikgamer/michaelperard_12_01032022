// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, ReactElement } from 'react';
import { useParams } from "react-router-dom";

import Card from './components/Card'
import { BarChart, LineChart, RadarChart, RadialChart } from './components/Charts'

/**
 * Dasboard component 
 * 
 * @return {ReactElement} Return a div with backend dependant data
 */
export default function Dashboard() {
  const [dataUser, setDataUser] = useState(),
        [dataActi, setDataActi] = useState(),
        [dataSess, setDataSess] = useState(),
        [dataPerf, setDataPerf] = useState()
  const param = useParams()

  useEffect(() => {
    fetch(process.env.REACT_APP_BACKEND + "user/" + param.id)
    .then(response => response.json()).then(data => setDataUser(data.data))
    
    fetch(process.env.REACT_APP_BACKEND + "user/" + param.id + "/activity")
    .then(response => response.json()).then(data => setDataActi(data.data.sessions))
  
    fetch(process.env.REACT_APP_BACKEND + "user/" + param.id + "/average-sessions")
    .then(response => response.json()).then(data => setDataSess(data.data.sessions))
  
    fetch(process.env.REACT_APP_BACKEND + "user/" + param.id + "/performance")
    .then(response => response.json()).then(data => setDataPerf(data.data.data))
  }, [param.id])

  return <div className="Dashboard">
           <div className="content">
             <h1>Bonjour <span>{dataUser?.userInfos.firstName ?? "Invité"}</span></h1>
             <p className="motd">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
             <div className="flex gap">
               <div className="flex gap column">
                 <BarChart data={dataActi} />
                 <div className="flex between" >
                   <LineChart   data={dataSess} />
                   <RadarChart  data={dataPerf} />
                   <RadialChart data={dataUser?.todayScore ?? dataUser?.score} />
                 </div>
               </div>
               <div className="flex between column" >
                 <Card keyName="calorieCount"      keyValue={dataUser?.keyData.calorieCount      ?? 0} />
                 <Card keyName="proteinCount"      keyValue={dataUser?.keyData.proteinCount      ?? 0} />
                 <Card keyName="carbohydrateCount" keyValue={dataUser?.keyData.carbohydrateCount ?? 0} />
                 <Card keyName="lipidCount"        keyValue={dataUser?.keyData.lipidCount        ?? 0} />
               </div>
             </div>
           </div>
         </div>
}
