'use client'

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'
import L from 'leaflet'

// Fix for default marker icons in Leaflet
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

interface PatientMapProps {
    onLocationSelect: (lat: number, lng: number, address: string) => void
}

function LocationMarker({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
    const [position, setPosition] = useState<L.LatLng | null>(null)

    useMapEvents({
        click(e) {
            setPosition(e.latlng)
            onSelect(e.latlng.lat, e.latlng.lng)
        },
        locationfound(e) {
            setPosition(e.latlng)
            onSelect(e.latlng.lat, e.latlng.lng)
        }
    })

    return position === null ? null : (
        <Marker position={position}></Marker>
    )
}

export default function PatientMap({ onLocationSelect }: PatientMapProps) {
    const [address, setAddress] = useState('')

    const handleSelect = async (lat: number, lng: number) => {
        // Reverse geocoding could be done here
        const addr = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`
        setAddress(addr)
        onLocationSelect(lat, lng, addr)
    }

    return (
        <div className="h-full w-full rounded-lg overflow-hidden border">
            <MapContainer
                center={[36.7538, 3.0588]} // Algiers default
                zoom={13}
                scrollWheelZoom={true}
                className="h-full w-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker onSelect={handleSelect} />
            </MapContainer>
            <div className="absolute bottom-4 left-4 right-4 bg-white p-2 rounded shadow text-sm z-[1000] dark:bg-gray-800">
                {address || 'Cliquez sur la carte pour choisir votre position'}
            </div>
        </div>
    )
}
