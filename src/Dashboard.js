// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, ReactElement } from 'react';
import { useParams } from "react-router-dom";

import Card from './components/Card'
import { BarChart, LineChart, RadarChart, RadialChart } from './components/Charts'
import { getDataUser, getDataActi, getDataSess, getDataPerf } from './api/Api'

/**
 * Dasboard component 
 * 
 * @return {ReactElement} Return a div with backend dependant data
 */
export default function Dashboard() {
  const [data, setData] = useState()
  const param = useParams()
  
  useEffect(() => {
    /**
     * Set data state with user data from the api
     */
    const loadData = async () => {
      try {
        let dataUser = await getDataUser(param.id),
            dataActi = await getDataActi(param.id),
            dataSess = await getDataSess(param.id),
            dataPerf = await getDataPerf(param.id)
        
        setData({ dataUser, dataActi, dataSess, dataPerf })
      } catch (error) {
        console.error(`[This is an error]\n${error}`)
      }
    }
  
    loadData()
  }, [param.id])

  return <div className="Dashboard">
           <div className="content">
             <h1>Bonjour <span>{data?.dataUser.userInfos.firstName ?? "Invité"}</span></h1>
             <p className="motd">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
             <div className="flex gap">
               <div className="flex gap column">
                 <BarChart data={data?.dataActi} />
                 <div className="flex between" >
                   <LineChart   data={data?.dataSess} />
                   <RadarChart  data={data?.dataPerf} />
                   <RadialChart data={data?.dataUser.todayScore ?? data?.dataUser.score} />
                 </div>
               </div>
               <div className="flex between column" >
                 <Card keyName="calorieCount"      keyValue={data?.dataUser.keyData.calorieCount      ?? 0} />
                 <Card keyName="proteinCount"      keyValue={data?.dataUser.keyData.proteinCount      ?? 0} />
                 <Card keyName="carbohydrateCount" keyValue={data?.dataUser.keyData.carbohydrateCount ?? 0} />
                 <Card keyName="lipidCount"        keyValue={data?.dataUser.keyData.lipidCount        ?? 0} />
               </div>
             </div>
           </div>
         </div>
}
