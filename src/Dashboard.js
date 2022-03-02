function Dashboard() {
  return (
    <div className="Dashboard">
      <div className="header">
        <h1>Bonjour {"username"}</h1>
        <p className="motd">{"motd"}</p>
      </div>
    </div>
  );
}

export default Dashboard;
