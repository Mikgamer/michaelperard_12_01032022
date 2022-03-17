import Card from './components/Card'
import { BarChart,LineChart,RadarChart,RadialChart } from './components/Charts'

/**
 * Dasboard
 * 
 * @return {ReactElement} Return the dashboard component
 */
export default function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="header">
        <h1>Bonjour <span>{"username"}</span></h1>
        <p className="motd">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        <div style={{"display":"flex", "gap":"30px"}}>
          <div style={{"display":"flex", "flexDirection":"column", "gap":"30px"}}>
            <BarChart />
            <div style={{"display":"flex", "justifyContent":"space-between"}}>
              <LineChart />
              <RadarChart />
              <RadialChart />
            </div>
          </div>
          <div style={{"display":"flex", "flexDirection":"column", "justifyContent":"space-between"}}>
            <Card keyName="calorieCount" keyValue={2600} />
            <Card keyName="proteinCount" keyValue={2600} />
            <Card keyName="carbohydrateCount" keyValue={2600} />
            <Card keyName="lipidCount" keyValue={2600} />
          </div>
        </div>
      </div>
    </div>
  );
}
