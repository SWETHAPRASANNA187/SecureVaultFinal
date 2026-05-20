import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function Stats() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const vault = JSON.parse(localStorage.getItem("vault")) || [];
    setItems(vault);
  }, []);

  // 📊 COUNTS
  const imageCount = items.filter(item =>
    item.fileType?.startsWith("image")
  ).length;

  const pdfCount = items.filter(item =>
    item.fileType?.includes("pdf")
  ).length;

  const docCount = items.filter(item =>
    item.fileType?.includes("word")
  ).length;

  const data = [
    { name: "Images", value: imageCount },
    { name: "PDFs", value: pdfCount },
    { name: "Docs", value: docCount },
  ];

  // 🔢 COUNTER COMPONENT
  function Counter({ value }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const interval = setInterval(() => {
        start += 1;
        if (start >= value) {
          start = value;
          clearInterval(interval);
        }
        setCount(start);
      }, 20);

      return () => clearInterval(interval);
    }, [value]);

    return <h2 className="stat-number">{count}</h2>;
  }

  return (
    <div className="page-container animate-fade-in" style={{ maxWidth: "700px" }}>

      <h2>Vault Statistics</h2>
      <p style={{ marginBottom: "2rem" }}>
        Overview of your secure storage usage.
      </p>

      {/* 🔢 TOTAL ITEMS CARD */}
      <div className="stats-card">
        <h3>Total Items</h3>
        <Counter value={items.length} />
        <p>Securely stored files in your vault</p>
      </div>

      {/* 📊 PIE CHART */}
      <div className="chart-container">
        <h3 className="chart-title">DATA DISTRIBUTION</h3>

        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={["#00ffcc", "#7c3aed", "#38bdf8"][index]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </div>

    </div>
  );
}

export default Stats;