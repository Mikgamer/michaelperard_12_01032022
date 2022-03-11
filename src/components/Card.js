// eslint-disable-next-line no-unused-vars
import React, { ReactElement } from "react"

import PropTypes from 'prop-types'
import '../styles/Card.css'
import { ReactComponent as CalIcon } from '../resources/calicon.svg'
import { ReactComponent as ProIcon } from '../resources/proicon.svg'
import { ReactComponent as CarIcon } from '../resources/caricon.svg'
import { ReactComponent as LipIcon } from '../resources/lipicon.svg'

/**
 * Card component 
 * 
 * @param {'calorieCount'|'proteinCount'|'carbohydrateCount'|'lipidCount'} props.keyName Key data name
 * @param {number} props.keyValue Key data value
 * @return {ReactElement} Return the card component with an icon, the key data value with a unit and the name of the key data
 */
export default function Card(props) {
  const arrData = [
          {icon : <CalIcon />, unit : "kCal", name : "Calories", bgClass : "bgCal" },
          {icon : <ProIcon />, unit : "g", name : "Proteines", bgClass : "bgPro" },
          {icon : <CarIcon />, unit : "g", name : "Glucides", bgClass : "bgCar" },
          {icon : <LipIcon />, unit : "g", name : "Lipides", bgClass : "bgLip" },
          {icon : "Error", unit : "Error", name : "Error", bgClass : "Error" } // In case of error
        ],
        keyName = props.keyName,
        keyValue = props.keyValue,
        keyData =  keyName === "calorieCount"       ? arrData[0] :
                    keyName === "proteinCount"      ? arrData[1] : 
                    keyName === "carbohydrateCount" ? arrData[2] : 
                    keyName === "lipidCount"        ? arrData[3] : arrData[4]
  return (
    <div className="Card">
      <div className={`card-icon ${keyData.bgClass}`}>{keyData.icon}</div>
      <div className="card-text">
        <span className="card-value">{keyValue + keyData.unit}</span>
        <span className="card-name">{keyData.name}</span>
      </div>
    </div>
  );
}

Card.prototype = {
  keyName: PropTypes.oneOf(['calorieCount', 'proteinCount', 'carbohydrateCount', 'lipidCount']),
  keyValue: PropTypes.number
}
