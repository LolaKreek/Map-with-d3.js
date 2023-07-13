import { geoEquirectangular, geoPath } from 'd3';
import { v4 as uuidv4 } from 'uuid';
import LightTooltip from '../WorldMap/LightTooltip';
import {WorldMapTypes} from '../WorldMap/types';

const DrawWorldMap = ({mapFeatures}:WorldMapTypes.MapObject) => {
  const projection = geoEquirectangular();
  
  return(
    <g>
      {(mapFeatures as []).map((data, i) => (
        <LightTooltip title={data['properties']['name']} key={`path-${uuidv4()}`}>
          <path
            d={geoPath().projection(projection)(data) as string}
            className='country'/>
        </LightTooltip>
      ))}
    </g>
  )
}

export default DrawWorldMap;