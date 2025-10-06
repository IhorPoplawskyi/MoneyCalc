import { useEffect, useState } from "react";
import "./App.css";
import { Table } from "./components/Table/Table";

function App() {
  const [firstSum, setFirstSum] = useState(0);
  const [secondSum, setSecondSum] = useState(0);
  const [difference, setDifference] = useState(0);

  const handleFirstSumChange = (value) => {
    setFirstSum(value);
  }
  const handleSecondSumChange = (value) => {
    setSecondSum(value);
  }

  useEffect(() => {
    setDifference(Math.round(secondSum - firstSum));
  }, [firstSum, secondSum]);

  return (
    <>
      <Table value={firstSum} onChange={handleFirstSumChange} />
      <div className="differenceBlock">
        <div>Різниця за місяць: {difference}</div>
        {difference > 0 && <div>За рік: {difference * 12}</div>}
      </div>
      <Table value={secondSum} onChange={handleSecondSumChange} />
    </>
  );
}

export default App;
