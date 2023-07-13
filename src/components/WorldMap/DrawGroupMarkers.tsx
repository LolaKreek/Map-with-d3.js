import { v4 as uuidv4 } from 'uuid';
import '../WorldMap/style.css';
import LightTooltip from '../WorldMap/LightTooltip';
import returnProjectionValueWhenValid from '../../features/worldMap/returnProjectionValueWhenValid';
import { WorldMapTypes } from '../WorldMap/types';

const DrawGroupMarkers = ({mainCoordinatesArray, radius}:WorldMapTypes.DrawMarkersProps) => {
  return(
    <g>
    {mainCoordinatesArray != undefined ? mainCoordinatesArray.map((d) => (
      <g key={`group-${uuidv4()}`}>
        <LightTooltip title={d[3]} placement="bottom">
          <g>
            <circle
                cx={returnProjectionValueWhenValid([d[1], d[2]], 0)} 
                cy={returnProjectionValueWhenValid([d[1], d[2]], 1)} 
                r={d[4] ? 10 : radius}
                fill={d[0] == 1 ? '#27AE60' : (d[0] == 2 ? "#DF0B0B" : "#F2C94C")}
                className={d[4] ? '' : 'markers-circle'}/>

            {d[4] ? 
              <text 
                x={returnProjectionValueWhenValid([d[1] + -1, d[2]], 0)} 
                y={returnProjectionValueWhenValid([d[1], d[2] + -1.5], 1)} 
                className='markers-circle-group-info'>
                {d[4]}</text>   
            : <></>}
          </g>
        </LightTooltip>             
      </g>
    )): <></>}
    </g>
  )
}

export default DrawGroupMarkers;