import { useEffect,useState } from "react";
import DataAustin from "../utils/DataClass";

export default function Interaction() {
  useEffect(() => {
    const fetchData = async () => {

        const instance = await DataAustin.create("/AustinCrashData.csv");
        instance.byYear(2014)
        console.log(instance.data)
    };

    fetchData();
  }, []);

  return <div>Interaction</div>;
}