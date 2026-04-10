function App() {
  const status = "React production container is running";

  return (
    <main className="container">
      <h1>Experiment 9.1 and 9.2</h1>
      <p>Dockerized React frontend with CI/CD-ready setup.</p>
      <div className="status-card">
        <h2>Deployment Status</h2>
        <p>{status}</p>
      </div>
    </main>
  );
}

export default App;
