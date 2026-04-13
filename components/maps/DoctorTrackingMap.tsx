'use client'

import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import L from 'leaflet'

// Custom icons
const patientIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/25/25694.png', // Home icon
    iconSize: [32, 32],
    iconAnchor: [16, 32]
})

const doctorIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3448/3448512.png', // Doctor/Amb icon
    iconSize: [40, 40],
    iconAnchor: [20, 40]
})

interface TrackingMapProps {
    patientPos: [number, number]
    doctorPos: [number, number] | null
}

function MapResizer() {
    const map = useMap()
    useEffect(() => {
        map.invalidateSize()
    }, [map])
    return null
}

export default function DoctorTrackingMap({ patientPos, doctorPos }: TrackingMapProps) {
    return (
        <div className="h-full w-full relative">
            <MapContainer
                center={patientPos}
                zoom={14}
                className="h-full w-full z-0"
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    attribution='&copy; CARTO'
                />
                <Marker position={patientPos} icon={patientIcon} />
                {doctorPos && (
                    <>
                        <Marker position={doctorPos} icon={doctorIcon} />
                        <Polyline positions={[patientPos, doctorPos]} color="#1A56DB" dashArray="10, 10" />
                    </>
                )}
                <MapResizer />
            </MapContainer>
        </div>
    )
}
