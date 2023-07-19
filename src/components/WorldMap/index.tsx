import { useEffect } from 'react';
import { geoEquirectangular, geoPath } from 'd3'
import * as d3 from 'd3';
import { WorldMapTypes } from './types'
import { v4 as uuidv4 } from 'uuid'
import LightTooltip from '../LightTooltip'
import './style.css'

const WorldMap = ({mapData, mapRef}: WorldMapTypes.IWorldMapProps) => {
    const projection = geoEquirectangular();

    const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 5])
        .translateExtent([[0, 0], [960, 470]])
        .on("zoom", ((e) => {
        //@ts-ignore
        d3.select(mapRef.current).selectChild().attr('transform', e.transform);
    }));

    useEffect(() => {
        // @ts-ignore
        d3.select(mapRef.current).call(zoom);
    }, [])

    return(
        <g>
            {(mapData.mapFeatures as []).map((data) => (
                <LightTooltip title={data['properties']['name']} key={`path-${uuidv4()}`}>
                    <path
                        d={geoPath().projection(projection)(data) as string}
                        className='country'/>
                </LightTooltip>
            ))}
        </g>
    )
}

export default WorldMap