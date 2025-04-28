import { useEffect, useState } from "react";
import DataAustin, { CrashData } from "../utils/DataClass";
import HeatMap from "../components/HeatMap";
// import D3Chart from "../components/D3Chart";
import Summery from "../components/Summery";

const instance = await DataAustin.create("/AustinCrashData-REFINED.csv");




interface filter {
  fatal: boolean | undefined;
  year: number | undefined;
  crashSeverity: number | undefined;
  timeOfDay: string | undefined;
}

export default function Interaction() {
  const [filter, setFilter] = useState<filter>({
    fatal: undefined,
    year: undefined,
    crashSeverity: undefined,
    timeOfDay: undefined,
  });

  const [data, setData] = useState<CrashData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const info = instance.filter(
        filter.fatal,
        filter.year,
        filter.crashSeverity,
        filter.timeOfDay
      );
      setData(info);
      console.log(info);
    };

    fetchData();
  }, [filter]);

  useEffect(() => {
    if (filter.fatal === true) {
      setFilter((prev) => ({
        ...prev,
        crashSeverity: undefined,
      }));
    }
  }, [filter.fatal]);

  useEffect(() => {
    if (filter.crashSeverity !== undefined) {
      setFilter((prev) => ({
        ...prev,
        fatal: undefined,
      }));
    }
  }, [filter.crashSeverity]);

  const optionsFatal = [
    { filterTitle: "fatal", value: undefined },
    { filterTitle: "fatal", value: true },
    // { filterTitle: "fatal", value: false }, //Might not need since crash severity already exisits
  ];

  const optionsYear = [
    { filterTitle: "year", value: undefined },
    { filterTitle: "year", value: 2014 },
    { filterTitle: "year", value: 2015 },
    { filterTitle: "year", value: 2016 },
    { filterTitle: "year", value: 2017 },
    { filterTitle: "year", value: 2018 },
    { filterTitle: "year", value: 2019 },
    { filterTitle: "year", value: 2020 },
    { filterTitle: "year", value: 2021 },
    { filterTitle: "year", value: 2022 },
    { filterTitle: "year", value: 2023 },
    { filterTitle: "year", value: 2024 },
    { filterTitle: "year", value: 2025 },
  ];

  const optionsCrashSev = [
    { filterTitle: "crashSeverity", value: undefined },
    { filterTitle: "crashSeverity", value: 1 },
    { filterTitle: "crashSeverity", value: 2 },
    { filterTitle: "crashSeverity", value: 3 },
    // { filterTitle: "crashSeverity", value: 4 },
    { filterTitle: "crashSeverity", value: 5 },
  ];

  const timeOfDay = [
    { filterTitle: "timeOfDay", value: undefined },
    { filterTitle: "timeOfDay", value: "Morning" },
    { filterTitle: "timeOfDay", value: "Afternoon" },
    { filterTitle: "timeOfDay", value: "Evening" },
    { filterTitle: "timeOfDay", value: "Night" },
  ];

  return (
    <>
      <div className="interactionMenu">
        <div className="row title"> Refine Search</div>
        <div className="row">
          {optionsFatal.map((options, i) => {
            const { filterTitle, value } = options;
            return (
              <label
                key={i}
                id="labelCheckBox"
                className={value == filter.fatal ? "checked" : ""}
                htmlFor={`${filterTitle}${value}`}
              >
                {value != undefined ? `${value}` : "ALL"}
                <input
                  type="checkbox"
                  className="checkBox"
                  id={`${filterTitle}${value}`}
                  title={`${filterTitle}`}
                  checked={filter.fatal == value} // KEY CHANGE ***
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      [e.target.title]: value,
                    }));
                  }}
                />
              </label>
            );
          })}
        </div>
        <div className="row row2">
          {optionsYear.map((options, i) => {
            const { filterTitle, value } = options;
            return (
              <label
                key={i}
                id="labelCheckBox"
                className={value == filter.year ? "checked" : ""}
                htmlFor={`${filterTitle}${value}`}
              >
                {value != undefined ? `${value}` : "ALL"}
                <input
                  type="checkbox"
                  className="checkBox"
                  id={`${filterTitle}${value}`}
                  title={`${filterTitle}`}
                  checked={filter.year == value} // KEY CHANGE ***
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      [e.target.title]: value,
                    }));
                  }}
                />
              </label>
            );
          })}
        </div>
        <div className="row">
          {optionsCrashSev.map((options, i) => {
            const { filterTitle, value } = options;
            return (
              <label
                key={i}
                id="labelCheckBox"
                className={value == filter.crashSeverity ? "checked" : ""}
                htmlFor={`${filterTitle}${value}`}
              >
                {value != undefined ? `${value}` : "ALL"}
                <input
                  type="checkbox"
                  className="checkBox"
                  id={`${filterTitle}${value}`}
                  title={`${filterTitle}`}
                  checked={filter.crashSeverity == value} // KEY CHANGE ***
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      [e.target.title]: value,
                    }));
                  }}
                />
              </label>
            );
          })}
        </div>
        <div className="row row2">
          {timeOfDay.map((options, i) => {
            const { filterTitle, value } = options;
            return (
              <label
                key={i}
                id="labelCheckBox"
                className={value == filter.timeOfDay ? "checked" : ""}
                htmlFor={`${filterTitle}${value}`}
              >
                {value != undefined ? `${value}` : "ALL"}
                <input
                  type="checkbox"
                  className="checkBox"
                  id={`${filterTitle}${value}`}
                  title={`${filterTitle}`}
                  checked={filter.timeOfDay == value} // KEY CHANGE ***
                  onChange={(e) => {
                    setFilter((prev) => ({
                      ...prev,
                      [e.target.title]: value,
                    }));
                  }}
                />
              </label>
            );
          })}
        </div>
        <Summery prop={data || []}/>
      </div>
      <div className="heatMap">
        <HeatMap prop ={data || []}/>
        {/* <D3Chart prop ={data}/> */}
      </div>
    </>
  );
}
