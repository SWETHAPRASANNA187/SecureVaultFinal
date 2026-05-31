import { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function Stats() {
  const [items, setItems] = useState([]);

  // ✅ FETCH WITH TOKEN (FIXED)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://securevaultfinal.onrender.com/vault", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        console.log(res.data); // 🔍 debug
        setItems(res.data);
      } catch (err) {
        console.log(err);
        alert("Error fetching stats ❌");
      }
    };

    fetchData();
  }, []);

  // ✅ SAFE COUNTS
  const imageCount = items.filter(
    (item) =>
      item.fileName &&
      item.fileName.match(/\.(jpg|jpeg|png)/i)
  ).length;

  const pdfCount = items.filter(
    (item) =>
      item.fileName &&
      item.fileName.toLowerCase().endsWith(".pdf")
  ).length;

  const docCount = items.filter(
    (item) =>
      item.fileName &&
      item.fileName.match(/\.(doc|docx)/i)
  ).length;

  const data = [
    { name: "Images", value: imageCount },
    { name: "PDFs", value: pdfCount },
    { name: "Docs", value: docCount },
  ];

  // ✅ COUNTER
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
    <div className="page-container" style={{ maxWidth: "700px" }}>

      <h2>Vault Statistics</h2>
      <p style={{ marginBottom: "2rem" }}>
        Overview of your secure storage usage.
      </p>

      {/* TOTAL */}
      <div className="stats-card">
        <h3>Total Items</h3>
        <Counter value={items.length} />
        <p>Securely stored files in your vault</p>
      </div>

      {/* CHART */}
      <div className="chart-container">
        <h3 className="chart-title">DATA DISTRIBUTION</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
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
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Stats;