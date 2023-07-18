import { Skeleton } from "@mui/material";
import './style.css';

const MapLoader = () => {
    return(
        <div className="dashboard-map-svg__main-container">
            <Skeleton className='map-svg__loader' animation="wave" variant="rectangular" />
        </div>
    )
}

export default MapLoader;