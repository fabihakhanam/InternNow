"use client";

import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { getIndustry, type MapPin } from "@/lib/catalog";

function pinIcon(color: string, emoji: string) {
  return L.divIcon({
    className: "",
    html: `<div class="pin" style="background:${color}"><span>${emoji}</span></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
  });
}

export default function MapView({ pins }: { pins: MapPin[] }) {
  const router = useRouter();

  return (
    <MapContainer
      center={[39.5, -98.35]}
      zoom={4}
      minZoom={3}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading maxClusterRadius={45}>
        {pins.map((p, idx) => {
          const ind = getIndustry(p.industry);
          return (
            <Marker
              key={`${p.oppId}-${idx}`}
              position={[p.lat, p.lng]}
              icon={pinIcon(p.color, ind.emoji)}
            >
              <Popup>
                <div className="space-y-1">
                  <div className="text-xs font-semibold" style={{ color: p.color }}>
                    {ind.emoji} {ind.label}
                  </div>
                  <div className="font-bold">{p.program ?? p.org}</div>
                  {p.program && <div className="text-xs text-slate-500">{p.org}</div>}
                  <div className="text-xs text-slate-500">
                    📍 {p.city}, {p.state}
                  </div>
                  <button
                    onClick={() => router.push(`/opportunities/${p.oppId}`)}
                    className="mt-1 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white"
                  >
                    View details →
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
