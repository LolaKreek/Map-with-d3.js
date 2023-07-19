import { useState } from "react";
import returnProjectionValueWhenValid from "../../features/worldMap/returnProjectionValueWhenValid";
import { MarkersTypes } from "./types";
import { v4 as uuidv4 } from 'uuid';
import DrawOneMarker from "./DrawOneMarker";

const Markers = ({coordinates, radius}: MarkersTypes.MarkersProps) => {
    const [currentGItem, setCurrentGItem] = useState<number | null>(null);

    return(
        <g>
            {coordinates.map((d, i) => (
                <g key={`group-${uuidv4()}`} onClick={() => currentGItem != i ? setCurrentGItem(i) : setCurrentGItem(null)}>
                    <DrawOneMarker data={d} radius={radius} />
                </g>
            ))}

            {currentGItem != null ?
                <g>
                    <rect
                        x={returnProjectionValueWhenValid([(+coordinates[currentGItem].latitude + -15), coordinates[currentGItem].longitude], 0)}
                        y={returnProjectionValueWhenValid([coordinates[currentGItem].latitude, (+coordinates[currentGItem].longitude)], 1)}
                        rx={2} 
                        height={30}
                        width={80}
                        className='markers-map__info-wrapper' />
                    <text 
                        onClick={() => setCurrentGItem(null)}
                        x={returnProjectionValueWhenValid([(+coordinates[currentGItem].latitude + +12.5), coordinates[currentGItem].longitude], 0)} 
                        y={returnProjectionValueWhenValid([coordinates[currentGItem].latitude, coordinates[currentGItem].longitude - +2], 1)}
                        className='markers-map__info-cancel'>x</text>
                    <text 
                        x={returnProjectionValueWhenValid([(+coordinates[currentGItem].latitude - +9.5), coordinates[currentGItem].longitude], 0)} 
                        y={returnProjectionValueWhenValid([coordinates[currentGItem].latitude, coordinates[currentGItem].longitude - +4.5], 1)}
                        className='markers-map__info-header'>{coordinates[currentGItem].name}</text>
                    <text 
                        x={returnProjectionValueWhenValid([(+coordinates[currentGItem].latitude - +13.5), coordinates[currentGItem].longitude], 0)} 
                        y={returnProjectionValueWhenValid([coordinates[currentGItem].latitude, (+coordinates[currentGItem].longitude - +6)], 1)}
                        className='markers-map__info'>{coordinates[currentGItem].status}</text>
                    <text 
                        x={returnProjectionValueWhenValid([(+coordinates[currentGItem].latitude - +13.5), coordinates[currentGItem].longitude], 0)} 
                        y={returnProjectionValueWhenValid([coordinates[currentGItem].latitude, (+coordinates[currentGItem].longitude - +7.5)], 1)}
                        className='markers-map__info'>Correctness: {coordinates[currentGItem].correctness}</text>
                    <text 
                        x={returnProjectionValueWhenValid([(+coordinates[currentGItem].latitude - +13.5), coordinates[currentGItem].longitude], 0)} 
                        y={returnProjectionValueWhenValid([coordinates[currentGItem].latitude, (+coordinates[currentGItem].longitude - +9)], 1)}
                        className='markers-map__info'>Latitude: {coordinates[currentGItem].latitude}</text>
                    <text
                        x={returnProjectionValueWhenValid([(+coordinates[currentGItem].latitude - +13.5), coordinates[currentGItem].longitude], 0)} 
                        y={returnProjectionValueWhenValid([coordinates[currentGItem].latitude, (+coordinates[currentGItem].longitude - +10.5)], 1)}
                        className='markers-map__info'>Longitude: {coordinates[currentGItem].longitude}</text>
                    <circle
                        cx={returnProjectionValueWhenValid([coordinates[currentGItem].latitude, coordinates[currentGItem].longitude], 0)} 
                        cy={returnProjectionValueWhenValid([coordinates[currentGItem].latitude, coordinates[currentGItem].longitude], 1)} 
                        r={radius}
                        fill={coordinates[currentGItem].statusColor == 1 ? '#27AE60' : (coordinates[currentGItem].statusColor == 2 ? "#DF0B0B" : "#F2C94C")}
                        className='markers-circle'/>
                </g> : 
            <></>}
        </g>
    )
}

export default Markers;