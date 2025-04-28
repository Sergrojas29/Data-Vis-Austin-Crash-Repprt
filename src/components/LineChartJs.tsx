import { useEffect,useState } from "react";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import DataAustin from "../utils/DataClass";


interface prop {
  prop: CrashData[];
}
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ info }: { info: number[] }) => {
  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: 'Accidents',
        data: info,
        fill: false,
        borderColor: 'rgb(0, 87, 87)',
        tension: 0
      },
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return <Line data={data} options={options}/>;
};


export default function LineChartJs({prop}:prop) {
  const [info, setInfo] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  useEffect(()=>{
    if (prop != undefined){
      const updateInfo = async () => {
        const result = await DataAustin.calendarYear(prop);
        setInfo(result);
      };
      updateInfo();
    }
  },[prop])

  return (
    <div className="LineChartJs">
      <LineChart info={info}/>
    </div>
  )
}
