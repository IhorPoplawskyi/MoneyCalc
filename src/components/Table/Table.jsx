import { useEffect, useState } from "react";
import { tarifData, secretData, vislugaData, livingWageData, militaryRanksData, positionsData, premiyaData } from "../../data";
import { TableItem } from "../TableItem/TableItem";

export const Table = () => {
  const [result, setResult] = useState(0);
  const [year, setYear] = useState(livingWageData[0].name);
  const [oklad, setOklad] = useState(tarifData[0].name);
  const [zvannya, setZvannya] = useState(militaryRanksData[0].name);
  const [prohod, setProhod] = useState(positionsData[0].name);
  const [visluga, setVisluga] = useState(vislugaData[1].name);
  const [secret, setSecret] = useState(secretData[0].name);

  const calculate = () => {
    let premiyaNum = premiyaData.find((item) => item.name == oklad);
    const premiyaObj = premiyaData.find((item) => String(item.name) === String(oklad));

  if (premiyaObj) {

    premiyaNum = visluga === "Без вислуги" && oklad <= 5
      ? (premiyaObj.value2 ? premiyaObj.value2 / 100 : 0)
      : (premiyaObj.value1 ? premiyaObj.value1 / 100 : 0);
    }

    const yearObj = livingWageData.find((item) => item.name === Number(year));
    const yearValue = yearObj ? parseFloat(yearObj.value) : 0;

    const okladObj = tarifData.find((item) => String(item.name) === String(oklad));
    let okladNum = okladObj ? parseFloat(okladObj.value * yearValue) : 0;
    okladNum = Math.round(okladNum / 10) * 10;

    const zvannyaObj = militaryRanksData.find((item) => item.name === zvannya);
    const zvannyaNum = zvannyaObj ? parseFloat(zvannyaObj.value) : 0;
    
    const prohodObj = positionsData.find((item) => item.name === prohod);
    const prohodNum = prohodObj ? parseFloat(prohodObj.value) : 0;

    const vislugaObj = vislugaData.find((item) => item.name === visluga);
    const vislugaNum = vislugaObj ? parseFloat(vislugaObj.value) : 0;

    const secretObj = secretData.find((item) => item.name === secret);
    const secretNum = secretObj ? parseFloat(secretObj.value) : 0;
    const totalVisluga = ((okladNum + zvannyaNum) * vislugaNum) / 100;

    const total = (zvannyaNum + okladNum + totalVisluga + (secretNum/100 * okladNum) + ((okladNum + zvannyaNum + totalVisluga) * prohodNum/100) + (okladNum * premiyaNum)) * 0.985;

    setResult(isNaN(total) ? "0.00" : total.toFixed(2));
  };

  useEffect(() => {
    calculate();
  }, [oklad, zvannya, prohod, visluga, secret, year]);

  return (
    <div className="myTable">
      <TableItem
        label="Посадовий оклад відповідного року"
        setValue={setYear}
        value={year}
        data={livingWageData}
      />
      <TableItem
        label="Оклад"
        setValue={setOklad}
        value={oklad}
        data={tarifData}
      />
      <TableItem
        label="Оклад за звання"
        setValue={setZvannya}
        value={zvannya}
        data={militaryRanksData}
      />
      <TableItem
        label="Надбавка за проходження військової служби"
        setValue={setProhod}
        value={prohod}
        data={positionsData}
        additional={true}
      />
      <TableItem
        label="Надбавка за вислугу років"
        setValue={setVisluga}
        value={visluga}
        data={vislugaData}
      />
      <TableItem
        label="Ступінь секретності"
        setValue={setSecret}
        value={secret}
        data={secretData}
      />
      <div className="myItem">
        <label>Всього: </label>
        {result}
      </div>
    </div>
  );
};
