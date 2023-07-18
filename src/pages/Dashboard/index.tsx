import { useEffect, useRef, useState } from "react";
import { feature } from "topojson-client";
import { FeatureCollection } from "geojson";
import { queue } from "d3-queue";
import { json } from "d3-request";
import { WorldMapTypes } from "../../components/WorldMap/types";
import MarkerTable from "../../components/MarkerTable";
import WorldMap from "../../components/WorldMap";
import { MarkerTableColumns } from "../../components/MarkerTable/MarkerTableColumns";
import './style.css';
import { DriveFileMove } from "@mui/icons-material";
import Markers from "../../components/Markers";
import MapLegend from "../../components/MapLegend";

const Dashboard = () => {
    const mapViewBox:string                     = '0 0 960 470';
    const mapRef                                = useRef<SVGSVGElement>(null);
    const markerRef                             = useRef<SVGGElement>(null);
    const title: string                         = 'Status table';
    const [mapData, setMapData]                 = useState<WorldMapTypes.MapObject>({mapFeatures: []});
    const [coordinatesData, setCoordinatesData] = useState<WorldMapTypes.CoordinatedData[]>([]);

    useEffect(() => {
        if(coordinatesData.length === 0){
            const fileName = ['../src/data/countries-110m.json', '../src/data/coordinates.json']
            queue()
                .defer(json, fileName[0])
                .defer(json, fileName[1])
                .await((error, d1, d2: WorldMapTypes.CoordinatedData[]) => {
                    if(error){
                        console.log(`You have a problem: ${error}`);
                    }
                    setMapData({mapFeatures: (((feature(d1, d1.objects.countries)) as unknown) as FeatureCollection).features})
                    setCoordinatesData(d2);
                })
        }
    }, [])

    return (
        <div className="dashboard__main-container">
            <div className="dashboard-map-svg__main-container">
                <svg className='map-svg' viewBox={mapViewBox} ref={mapRef}>
                    <g>
                        <g>
                            <WorldMap mapData={mapData} mapRef={mapRef}/>
                        </g>

                        <g ref={markerRef}>
                            <Markers coordinates={coordinatesData} radius={8} />
                        </g>
                    </g>
                </svg>

                <div className="map-legend__main-container">
                    <p className="map-legend-main-container__main-header">Map legend</p>
                    <MapLegend coordinates={coordinatesData} markerRef={markerRef} />
                </div>
            </div>
            
            <MarkerTable coordinates={coordinatesData} title={title} columns={MarkerTableColumns} markerRef={markerRef} />
        </div>
    );
};

export default Dashboard;