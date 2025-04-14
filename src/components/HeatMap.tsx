import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import Papa from "papaparse";
import { useEffect, useState } from "react";

function HeatLayer({ heatData}: {heatData: number[][]}) {
  const map = useMap();
  useEffect(() => {
    const heatLayer = L.heatLayer(heatData, {
      radius: 10,
      blur: 0,
      maxZoom: 13,
      gradient:{0.4: 'blue', 0.65: 'lime', 1: 'red'},
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map]);

  return null;
}

export default function HeatMap() {
  const [data, setData] = useState<number[][]>([]);

  useEffect(() => {
    const fetchParseData = async () => {
      Papa.parse("/FatalData.csv", {
        download: true,
        delimiter: ",",
        header: true,
        dynamicTyping: true,
        complete: (res) => {

            const parsedData: number[][] = res.data
            .filter((info: any) => info.latitude && info.longitude)
            .map((info: any) => [info.latitude, info.longitude]);

            setData(parsedData);
        
        },
      });
    };
    fetchParseData();
  }, []);

  

  return (
    <MapContainer
      center={[30.2672, -97.7431]}
      zoom={11}
      style={{ height: "100vh", width: "100%" }}
      className="heatMap"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <HeatLayer heatData={data} />
    </MapContainer>
  );
}
