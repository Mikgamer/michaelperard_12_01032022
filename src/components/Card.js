// eslint-disable-next-line no-unused-vars
import { ReactElement } from "react"
import PropTypes from 'prop-types'

import '../styles/Card.css'
import { ReactComponent as CalIcon } from '../resources/calicon.svg'
import { ReactComponent as ProIcon } from '../resources/proicon.svg'
import { ReactComponent as CarIcon } from '../resources/caricon.svg'
import { ReactComponent as LipIcon } from '../resources/lipicon.svg'

/**
 * Card component 
 * 
 * @param  {'calorieCount'|'proteinCount'|'carbohydrateCount'|'lipidCount'} props.keyName Key data name
 * @param  {number} props.keyValue Key data value
 * @return {ReactElement} Return a card component with an icon, the key data value with a unit and the name of the key data
 */
export default function Card(props) {
  const keyData = props.keyName === "calorieCount"      ? {icon : <CalIcon />, unit : "kCal" , name : "Calories" , bgClass : "bgCal" } :
                  props.keyName === "proteinCount"      ? {icon : <ProIcon />, unit : "g"    , name : "Proteines", bgClass : "bgPro" } : 
                  props.keyName === "carbohydrateCount" ? {icon : <CarIcon />, unit : "g"    , name : "Glucides" , bgClass : "bgCar" } : 
                  props.keyName === "lipidCount"        ? {icon : <LipIcon />, unit : "g"    , name : "Lipides"  , bgClass : "bgLip" } : 
                                                          {icon : "Error"    , unit : "Error", name : "Error"    , bgClass : "Error" }
                   
  return <div className="Card">
           <div className={`card-icon ${keyData.bgClass}`}>{keyData.icon}</div>
           <div className="card-text">
             <span className="card-value">{props.keyValue + keyData.unit}</span>
             <span className="card-name">{keyData.name}</span>
           </div>
         </div>
}

Card.propTypes = {
  keyName : PropTypes.oneOf(['calorieCount', 'proteinCount', 'carbohydrateCount', 'lipidCount']),
  keyValue: PropTypes.number
}
