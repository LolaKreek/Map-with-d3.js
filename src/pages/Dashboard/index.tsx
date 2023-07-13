import React, {useState, useEffect} from 'react';
import { WorldMapTypes } from '../../components/WorldMap/types';
import { queue } from 'd3-queue';
import { json } from 'd3-request';
import { FeatureCollection } from 'geojson';
import { feature } from 'topojson-client';
import MarkerTable from '../../components/MarkerTable';
import '../Dashboard/style.css';
import WorldMap from '../../components/WorldMap';

const Dashboard = () => {
    const title: string = 'Table with statuses';

    const [mapData, setMapData] = useState<WorldMapTypes.MapObject>({mapFeatures: []});
    const [coordinatesData, setCoordinatesData] = useState<WorldMapTypes.CoordinatedData[]>([]);
    console.log(coordinatesData)

    useEffect(() => {
        if(coordinatesData.length === 0){
            const fileName = ['../src/data/countries-110m.json', '../src/data/coordinates.json']
            queue()
                .defer(json, fileName[0])
                .defer(json, fileName[1])
                .await((error, d1, d2: WorldMapTypes.CoordinatedData[]) => {
                    if(error){
                        console.log(`We have a problem: ${error}`);
                    }
                    setMapData({mapFeatures: (((feature(d1, d1.objects.countries)) as unknown) as FeatureCollection).features})
                    setCoordinatesData(d2);
                })
        }
    }, [coordinatesData])

    return (
        <div>
            <WorldMap mapData={mapData} coordinatesData={coordinatesData} scale={200} cx={400} cy={400} />

            <div className='table-state-container'>
                <MarkerTable title={title} data={coordinatesData} />
            </div>
        </div>
    );
};

export default Dashboard;