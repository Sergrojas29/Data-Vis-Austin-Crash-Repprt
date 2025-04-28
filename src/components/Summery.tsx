import '../styles/summery.css'
import LineChartJs from './LineChartJs';

interface prop {
  prop: CrashData[];
}
export default function Summery({prop}:prop) {

  return (
    <div className="summery">
      <div className="row">
        <div className="title">Summery</div>
      </div>
      <div className="r1 r2">
        <div className="sumlabel">Total Crashs :</div>
        <div className="sumAmount"> {prop != undefined && prop.length.toLocaleString()}</div>
      </div>
      <div className="r1 ">
        <div className="sumlabel">Total Injury Count:</div>
        <div className="sumAmount"> {prop != undefined && prop.reduce((sum, { tot_injry_cnt = 0 }) => sum + tot_injry_cnt, 0).toLocaleString()}</div>
      </div>
      <div className="r1 r2">
        <div className="sumlabel">Total Death Count:</div>
        <div className="sumAmount"> {prop != undefined && prop.reduce((sum, { death_cnt = 0 }) => sum + death_cnt, 0).toLocaleString()}</div>
      </div>
      <div className="r1">
        <div className="sumlabel">Est. Total Cost:</div>
        <div className="sumAmount"> {prop != undefined && prop.reduce((sum, { Estimated_Total_Comprehensive_Cost = 0 }) => sum + Estimated_Total_Comprehensive_Cost, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</div>
      </div>
      <LineChartJs prop={prop}/>
    </div>
  )
}
