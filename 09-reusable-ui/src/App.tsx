import './App.css'


interface CardProps {
  children: React.ReactNode;
}


type ButtonVariant = 'primary' | 'secondary' | 'danger';
interface ButtonProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
}



function Card({ children }: CardProps) {
  return (
    <div style={{ 
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      marginBottom: '16px',
      backgroundColor: '#fff'
     }}>
      {children}
    </div>
  );
}

function Button({ variant = "primary", children }: ButtonProps) {
    const styles = {
    primary:   { backgroundColor: "#2563eb", color: "white" },
    secondary: { backgroundColor: "#e5e7eb", color: "black" },
    danger:    { backgroundColor: "#dc2626", color: "white" },
  };

  return (
    <button style={{ padding: "8px 16px", borderRadius: "6px", border: "none", ...styles[variant] }}>
      {children}
    </button>
  );
}

function App() {
  return (
    <div className="App">
      <Card>
        <h2>My Card</h2>
        <p>This is a simple card component.</p>
        <Button variant="primary">Click Me</Button>
      </Card>

      <Card>
        <p>A totally different card — just one line.</p>
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
      </Card>

      <Card>
        <h3>Workout</h3>
        <p>Swim — 0.6km — 23min</p>
        <Button variant="danger">Delete</Button>
      </Card>
    </div>
  );
}

export default App
