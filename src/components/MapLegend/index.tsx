import { v4 as uuidv4 } from 'uuid';
import { MapLegendTypes } from './types';
import { useEffect, useState } from 'react';
import { WorldMapTypes } from '../WorldMap/types';
import * as d3 from 'd3';
import './style.css'
import returnProjectionValueWhenValid from '../../features/worldMap/returnProjectionValueWhenValid';
import LightTooltip from '../LightTooltip';

const MapLegend = ({coordinates, markerRef}: MapLegendTypes.MapLegendProps) => {
    const [selectedGroup, setSelectedGroup] = useState<WorldMapTypes.CoordinatedData[]>([]);
    const markerSvg = d3.select(markerRef.current);
    const rows = [
        {title: 'all', statusColor: 0},
        {title: 'yellow', statusColor: 1},
        {title: 'red', statusColor: 2},
        {title: 'green', statusColor: 3}
    ];

    const setGroupOfMarkers = () => {
        if(selectedGroup.length != 0){
            markerSvg.selectChild().remove()
            const groupContainer = markerSvg.append('g')
            selectedGroup.forEach((currentItem) => {
                groupContainer.append('g').append('circle')
                    .attr('cx', returnProjectionValueWhenValid([currentItem.latitude, currentItem.longitude], 0))
                    .attr('cy', returnProjectionValueWhenValid([currentItem.latitude, currentItem.longitude], 1))
                    .attr("r", 10)
                    .attr("stroke", 'aliceblue')
                    .attr("stroke-width", 0.2)
                    .attr("fill", currentItem.statusColor == 1 ? '#27AE60' : (currentItem.statusColor == 2 ? "#DF0B0B" : "#F2C94C"))
                    .attr("className", 'markers-circle')
            })
        }
    }

    useEffect(() => {
        setGroupOfMarkers();
    }, [selectedGroup])

    return(
        <div className="map-legend__dots-main-container">
            {rows.map((row) => (
                <span key={`group-${uuidv4()}`} id={`${row.statusColor}`} className={`dot-${row.statusColor} map-legend__dots`}
                    onClick={() => {
                        if(row.statusColor == 0){
                            setSelectedGroup(coordinates)
                        }else{
                            setSelectedGroup(coordinates.filter(item => item.statusColor == row.statusColor))
                        }
                    }}>
                        <p className='dot-additional'>All</p>
                </span>    
            ))}
        </div>
    )
}

export default MapLegend;