"use client";
import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { geoJsonData } from "../geoData2";
import type L from "leaflet";
import { useRouter } from "next/router";
import supabase from "../../supabase"; // ✅ Add this

const LeafletMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        if (!mapRef.current || mapInstance.current) return;

        mapInstance.current = L.map(mapRef.current).setView([22.325, 73.207], 13);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(mapInstance.current);

        L.geoJSON(geoJsonData as GeoJSON.GeoJsonObject, {
          pointToLayer: (feature: GeoJSON.Feature, latlng: L.LatLng) => {
            return L.circleMarker(latlng, {
              radius: 8,
              fillColor: "blue",
              color: "black",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.6,
            });
          },
          onEachFeature: (feature: GeoJSON.Feature, layer: L.Layer) => {
            const locationName = feature.properties
              ? Object.keys(feature.properties)[0]
              : "Unknown";

            if ("bindPopup" in layer && typeof layer.bindPopup === "function") {
              layer.bindPopup(`<b>${locationName}</b>`);
            }

            layer.on?.("click", async () => {
              if (!locationName) {
                alert("Invalid location");
                return;
              }

              const { data: sessionData } = await supabase.auth.getUser();
              const user = sessionData?.user || null;

              let role = "guest";

              if (user) {
                role = localStorage.getItem("userRole") || "";

                // If role not cached, fetch it
                if (!role) {
                  const { data: userRow } = await supabase
                    .from("Users")
                    .select("role")
                    .eq("id", user.id)
                    .single();

                  role = userRow?.role || "guest";
                  localStorage.setItem("userRole", role);
                }
              }

              // Check if signal data exists
              const { data, error } = await supabase
                .from("information")
                .select("*")
                .eq("location", locationName);

              const encodedLocation = encodeURIComponent(locationName);

              if (role === "admin") {
                if (data && data.length > 0) {
                  router.push(`/loc-details/${encodedLocation}`);
                } else {
                  router.push("/addsignal");
                }
              } else {
                // 🚀 Always redirect user to AI output page
                router.push(`/loc-details/${encodedLocation}`);
              }
            });


            layer.on?.("mouseover", () => {
              if (
                "bindTooltip" in layer &&
                typeof layer.bindTooltip === "function"
              ) {
                (layer as L.Layer & { bindTooltip: any })
                  .bindTooltip(locationName, {
                    permanent: false,
                    direction: "top",
                  })
                  .openTooltip();
              }
            });

            layer.on?.("mouseout", () => {
              if (
                "closeTooltip" in layer &&
                typeof layer.closeTooltip === "function"
              ) {
                layer.closeTooltip();
              }
            });
          },
        }).addTo(mapInstance.current);
      });
    }
  }, []);

  return <div ref={mapRef} style={{ height: "600px", width: "100%" }} />;
};

export default dynamic(() => Promise.resolve(LeafletMap), { ssr: false });
