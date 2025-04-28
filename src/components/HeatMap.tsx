import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";
import { useEffect, useState } from "react";
import {CrashData} from "../utils/DataClass";
interface prop {
  prop: CrashData[];
}

function HeatLayer({ heatData}: {heatData: number[][]}) {
  const map = useMap();
  useEffect(() => {
    const heatLayer = L.heatLayer(heatData, {
      radius: 10,
      blur: 0,
      maxZoom: 14,
      gradient:{0.4: 'blue', 0.65: 'lime', 1: 'red'},
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, heatData]); //! add to update to when heat datat changes IE function input of prop
  return null;
}






export default function HeatMap({prop}: prop) {
  const [coordinates, setCoordinates] = useState<number[][]>([])

  useEffect(() => {
    if (prop == undefined ) return
    setCoordinates(prop.filter((info: any) => info.latitude && info.longitude).map((info: any) => [info.latitude, info.longitude]))
  }, [prop]);


  return (
    <MapContainer
      center={[30.254638, -97.691270]}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
      className="heatMap"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <HeatLayer heatData={coordinates} />
    </MapContainer>
  );
}
