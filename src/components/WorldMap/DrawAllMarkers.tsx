import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LightTooltip from '../WorldMap/LightTooltip';
import returnProjectionValueWhenValid from '../../features/worldMap/returnProjectionValueWhenValid';
import {WorldMapTypes} from '../WorldMap/types';

const DrawAllMarkers = ({radius, coordinatesData}:WorldMapTypes.DrawMarkersProps) => {
  const [currentGItem, setCurrentGItem] = useState<number | null>(null);

  return(
    <g> {coordinatesData != undefined ?
        <g>
            {coordinatesData.map((d:any, i:any) => (
                <g key={`group-${uuidv4()}`} onClick={() => currentGItem != i ? setCurrentGItem(i) : setCurrentGItem(null)}>
                <LightTooltip title={d.name} placement="bottom">
                    <circle
                        cx={returnProjectionValueWhenValid([d.latitude, d.longitude], 0)} 
                        cy={returnProjectionValueWhenValid([d.latitude, d.longitude], 1)} 
                        r={radius}
                        fill={d.statusColor == 1 ? '#27AE60' : (d.statusColor == 2 ? "#DF0B0B" : "#F2C94C")}
                        className='markers-circle'/>
                </LightTooltip>
                </g>
            ))}

            {currentGItem != null ?
                <g>
                    <rect
                        x={returnProjectionValueWhenValid([(+coordinatesData[currentGItem].latitude + -12), coordinatesData[currentGItem].longitude], 0)}
                        y={returnProjectionValueWhenValid([coordinatesData[currentGItem].latitude, (+coordinatesData[currentGItem].longitude)], 1)}
                        rx={2} 
                        height={30}
                        width={60}
                        className='markers-map__info-wrapper'/>
                    <text 
                        onClick={() => setCurrentGItem(null)}
                        x={returnProjectionValueWhenValid([(+coordinatesData[currentGItem].latitude + +8.5), coordinatesData[currentGItem].longitude], 0)} 
                        y={returnProjectionValueWhenValid([coordinatesData[currentGItem].latitude, coordinatesData[currentGItem].longitude - +2], 1)}
                        className='markers-map__info-cancel'>x</text>
                    <text 
                        x={returnProjectionValueWhenValid([(+coordinatesData[currentGItem].latitude - +9.5), coordinatesData[currentGItem].longitude], 0)} 
                        y={returnProjectionValueWhenValid([coordinatesData[currentGItem].latitude, coordinatesData[currentGItem].longitude - +3], 1)}
                        className='markers-map__info-header'>{coordinatesData[currentGItem].name}</text>
                    <text 
                        x={returnProjectionValueWhenValid([(+coordinatesData[currentGItem].latitude - +11.5), coordinatesData[currentGItem].longitude], 0)} 
                        y={returnProjectionValueWhenValid([coordinatesData[currentGItem].latitude, (+coordinatesData[currentGItem].longitude - +4.5)], 1)}
                        className='markers-map__info'>{coordinatesData[currentGItem].status}</text>
                    <text 
                        x={returnProjectionValueWhenValid([(+coordinatesData[currentGItem].latitude - +11.5), coordinatesData[currentGItem].longitude], 0)} 
                        y={returnProjectionValueWhenValid([coordinatesData[currentGItem].latitude, (+coordinatesData[currentGItem].longitude - +6)], 1)}
                        className='markers-map__info'>Correctness: {coordinatesData[currentGItem].correctness}</text>
                    <text 
                        x={returnProjectionValueWhenValid([(+coordinatesData[currentGItem].latitude - +11.5), coordinatesData[currentGItem].longitude], 0)} 
                        y={returnProjectionValueWhenValid([coordinatesData[currentGItem].latitude, (+coordinatesData[currentGItem].longitude - +7.5)], 1)}
                        className='markers-map__info'>Latitude: {coordinatesData[currentGItem].latitude}</text>
                    <text
                        x={returnProjectionValueWhenValid([(+coordinatesData[currentGItem].latitude - +11.5), coordinatesData[currentGItem].longitude], 0)} 
                        y={returnProjectionValueWhenValid([coordinatesData[currentGItem].latitude, (+coordinatesData[currentGItem].longitude - +9)], 1)}
                        className='markers-map__info'>Longitude: {coordinatesData[currentGItem].longitude}</text>
                    <circle
                        cx={returnProjectionValueWhenValid([coordinatesData[currentGItem].latitude, coordinatesData[currentGItem].longitude], 0)} 
                        cy={returnProjectionValueWhenValid([coordinatesData[currentGItem].latitude, coordinatesData[currentGItem].longitude], 1)} 
                        r={radius}
                        fill={coordinatesData[currentGItem].statusColor == 1 ? '#27AE60' : (coordinatesData[currentGItem].statusColor == 2 ? "#DF0B0B" : "#F2C94C")}
                        className='markers-circle'/>
                </g> : 
            <></>}
        </g>
    : <></>
    } </g>
  )
}

export default DrawAllMarkers;