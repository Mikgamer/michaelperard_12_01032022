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
        <h1>Bonjour {"username"}</h1>
        <p className="motd">{"motd"}</p>
        {/* <Card keyName="calorieCount" keyValue={2600} />
        <Card keyName="proteinCount" keyValue={2600} />
        <Card keyName="carbohydrateCount" keyValue={2600} />
        <Card keyName="lipidCount" keyValue={2600} /> */}
        <BarChart />
        <br />
        <LineChart />
        <RadarChart />
        <RadialChart />
      </div>
    </div>
  );
}
