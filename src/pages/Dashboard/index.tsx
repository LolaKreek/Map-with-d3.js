import { useEffect, useRef, useState } from "react";
// import { feature } from "topojson-client";
// import { FeatureCollection } from "geojson";
import { queue } from "d3-queue";
import { json } from "d3-request";
import { WorldMapTypes } from "../../components/WorldMap/types";
import MarkerTable from "../../components/MarkerTable";
import WorldMap from "../../components/WorldMap";
import { MarkerTableColumns } from "../../components/MarkerTable/MarkerTableColumns";
import './style.css';
import Markers from "../../components/Markers";
import MapLegend from "../../components/MapLegend";
import TableLoader from "../../components/Loader/TableLoader";
import MapLoader from "../../components/Loader/MapLoader";

const Dashboard = () => {
    const mapViewBox:string                     = '0 0 960 470';
    const mapRef                                = useRef<SVGSVGElement>(null);
    const markerRef                             = useRef<SVGGElement>(null);
    const title: string                         = 'Status table';
    const [mapData]                 = useState<WorldMapTypes.MapObject>({mapFeatures: []});
    const [coordinatesData] = useState<WorldMapTypes.CoordinatedData[]>([]);
    const [ifPageLoad, setIfPageLoad]           = useState<boolean>(false);

    useEffect(() => {
        if(coordinatesData.length === 0){
            // const fileName = ['../src/data/countries-110m.json', '../src/data/coordinates.json']
            // const fileName = ["/countries-110m.json", "/coordinates.json"]
            const exFile = "/ex.json";
            queue()
                .defer(json, exFile)
                .await((error, ex) => {
                    console.log("error: ", error)
                    console.log("ex: ", ex)
                })
            // queue()
            //     .defer(json, fileName[0])
            //     .defer(json, fileName[1])
            //     .await((error, d1, d2: WorldMapTypes.CoordinatedData[]) => {
            //         if(error){
            //             console.log(`You have a problem: ${error}`);
            //         }
            //         console.log("d1: ", d1);
            //         console.log("d2: ", d2);
            //         console.log("error: ", error);
            //         setMapData({mapFeatures: (((feature(d1, d1.objects.countries)) as unknown) as FeatureCollection).features})
            //         setCoordinatesData(d2);
            //     })
            console.log("exFile: ", exFile);
        }
        setIfPageLoad(true);
    }, [])

    return (
        <div className="dashboard__main-container">
                {ifPageLoad ?  <div className="dashboard-map-svg__main-container">
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
                </div> : <MapLoader />}
            
            {ifPageLoad ? <MarkerTable coordinates={coordinatesData} title={title} columns={MarkerTableColumns} markerRef={markerRef} /> : <TableLoader rowsNumber={7}/>}
        </div>
    );
};

export default Dashboard;