import returnProjectionValueWhenValid from '../../features/worldMap/returnProjectionValueWhenValid';
import LightTooltip from '../LightTooltip';
import { MarkersTypes } from './types';

const DrawOneMarker = ({data, radius}: MarkersTypes.OneMarkerProps) => {
    return(
        <>
            <LightTooltip title={data.name} placement="bottom">
                <circle
                    cx={returnProjectionValueWhenValid([data.latitude, data.longitude], 0)} 
                    cy={returnProjectionValueWhenValid([data.latitude, data.longitude], 1)} 
                    r={radius}
                    fill={data.statusColor == 1 ? '#27AE60' : (data.statusColor == 2 ? "#DF0B0B" : "#F2C94C")}
                    className='markers-circle'/>
            </LightTooltip>
        </>
    )
}

export default DrawOneMarker;