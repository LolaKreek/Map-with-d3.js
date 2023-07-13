import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { WorldMapTypes } from './types';
import './style.css';
import DrawWorldMap from '../WorldMap/DrawWorldMap';
import DrawAllMarkers from '../WorldMap/DrawAllMarkers';
import DrawGroupMarkers from '../WorldMap/DrawGroupMarkers';

const WorldMap = (props: WorldMapTypes.IWorldMapProps) => {
  const mapViewBox:string = '0 0 960 470';  
  const parsedCoordinatesData:[number, number, number, string][] = props.coordinatesData.map(({statusColor, latitude, longitude, name }:WorldMapTypes.CoordinatedData) => ([statusColor, latitude, longitude, name]));
  const [mainCoordinatesArray, setMainCoordinatesArray] = useState<[number, number, number, string, number][] | null | undefined>(undefined);
  const [arrayWithGroupedMarkers, setArrayWithGroupedMarkers] = useState();

  const mapRef =     useRef<SVGSVGElement>(null);
  const markerRef =  useRef<SVGGElement>(null);
  const svg =        d3.select(mapRef.current);
  const gMarkers =   d3.select(markerRef.current).selectChild();

  const [radius, setRadius] =         useState<number>(10);
  const [ifLoad, setIfLoad] =         useState<boolean>(false);
  const [ifPageLoad, setIfPageLoad] = useState<boolean>(false);
  const [currentGItem, setCurrentGItem] = useState<number | null>(null);

  // Arrays of markers grouped by color
  const [greenMarkers, setGreenMarkers] =   useState<number[][]>();
  const [redMarkers, setRedMarkers] =       useState<number[][]>();
  const [yellowMarkers, setYellowMarkers] = useState<number[][]>();

  function isEqualWithTolerance(value1: number, value2: number): boolean {
    setIfLoad(true);
    return Math.abs(value1 - value2) <= 3;
  }
  
  function areArraysEqualWithTolerance(arr1: number[], arr2: number[]): boolean {
    return arr1.every((value1, i) => isEqualWithTolerance(value1, arr2[i]));
  }
  
  // This function looks for and returns coordinates that are close to each other for a specific color (statusColor)
  function getArraysEqualWithTolerance(arrayOfArrays: number[][]): number[][] {
    const matchingArrays: number[][] = [];
    for (let i = 0; i < arrayOfArrays.length - 1; i++) {
      const arr1 = arrayOfArrays[i];
      for (let j = i + 1; j < arrayOfArrays.length; j++) {
        const arr2 = arrayOfArrays[j];
        if (areArraysEqualWithTolerance(arr1, arr2)) {
          matchingArrays.push(arr1);
          matchingArrays.push(arr2);
        }
      }
    }
    return matchingArrays;
  }

  const groupDataCoordinates = () => {
    // Here the main array is grouped into three separate arrays by statusColor
    const groupArrayByStatusColor = props.coordinatesData.reduce((item:any, { statusColor, latitude, longitude }) => {
      if (!item[statusColor]) item[statusColor] = [];
      item[statusColor].push([statusColor, latitude, longitude]);
      return item;
    }, {});

    // Group-based values are assigned to the three arrays (each of the arrays contains markers that are close to each other and have the same color). Also duplicate markers in each array are removed here
    if(Object.keys(groupArrayByStatusColor).length){
      setGreenMarkers(Array.from(new Set(getArraysEqualWithTolerance(groupArrayByStatusColor[1]).map(a => JSON.stringify(a)))).map(str => JSON.parse(str)))
      setRedMarkers(Array.from(new Set(getArraysEqualWithTolerance(groupArrayByStatusColor[2]).map(a => JSON.stringify(a)))).map(str => JSON.parse(str)))
      setYellowMarkers(Array.from(new Set(getArraysEqualWithTolerance(groupArrayByStatusColor[3]).map(a => JSON.stringify(a)))).map(str => JSON.parse(str)))
    }
  }

  // In this function, the array that contains all the markers is filtered. The markers of all colors that are close to each other are removed from the array. 
  // At the end of the array, three groups of markers are added, which are grouped by color. For each of the three groups, an additional value is added at the end, 
  // which indicates the number of grouped markers of a given color. With the help of an additional value, groups of markers will later be distinguished from single markers
  const groupMarkers = () => {
    if (yellowMarkers && greenMarkers && redMarkers) {
      const result:any = parsedCoordinatesData.filter(elem1 => {return !yellowMarkers.some(elem2 => {return elem1[0] === elem2[0] && elem1[1] === elem2[1];});})
        .filter(elem1 => {return !greenMarkers.some(elem2 => {return elem1[0] === elem2[0] && elem1[1] === elem2[1];});})
        .filter(elem1 => {return !redMarkers.some(elem2 => {return elem1[0] === elem2[0] && elem1[1] === elem2[1];});})
      
      yellowMarkers.length ? result.push([yellowMarkers[0][0], yellowMarkers[0][1], yellowMarkers[0][2], yellowMarkers.length, yellowMarkers.length]) : '';
      greenMarkers.length ? result.push([greenMarkers[0][0], greenMarkers[0][1], greenMarkers[0][2], greenMarkers.length, greenMarkers.length]) : '';
      redMarkers.length ? result.push([redMarkers[0][0], redMarkers[0][1], redMarkers[0][2], redMarkers.length, redMarkers.length]) : '';
      setArrayWithGroupedMarkers(result);
      setMainCoordinatesArray(result);
    }
  }

  // const handleZoom = (e: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
  //   const { k } = e.transform;
  //   const r = 10 / k;
  //   setRadius(r);
  //   const markersArray = gMarkers.selectAll('.markers-circle');

  //   //@ts-ignore
  //   svg.selectChild().attr('transform', e.transform);
  //   markersArray.attr("r", r);

  //   if (k < 2) {
  //     setMainCoordinatesArray(arrayWithGroupedMarkers)             
  //   } else {
  //     setMainCoordinatesArray(null)
  //   }
  // }

  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([1, 5])
    .translateExtent([[0, 0], [960, 470]])
    .on("zoom", ((e) => {
      const { k } = e.transform;
      // setRadius(10 / k);

      //@ts-ignore
      svg.selectChild().attr('transform', e.transform);
  
      if (k < 2) {
        setMainCoordinatesArray(arrayWithGroupedMarkers) 
      } else {
        setMainCoordinatesArray(null)     
      }
    }));

  useEffect(() => {
    console.log("useEffect");
    if(ifPageLoad){
      groupMarkers();
      setIfPageLoad(false)
    }

    if(!ifLoad){
      groupDataCoordinates()
      setIfPageLoad(true)
    }
    
    // @ts-ignore
    svg.call(zoom);

    console.log("props.mapData.mapFeatures -111111: ", props.mapData.mapFeatures);

  }, [parsedCoordinatesData])
  
  return(
    <div>
      <svg className='map-svg' viewBox={mapViewBox} ref={mapRef}>
        <g>
          <DrawWorldMap mapFeatures={props.mapData.mapFeatures as []} />
          <g ref={markerRef}>
            {!ifPageLoad ? 
              mainCoordinatesArray == null ?
                <DrawAllMarkers radius={radius} coordinatesData={props.coordinatesData}/>
              : <DrawGroupMarkers mainCoordinatesArray={mainCoordinatesArray} radius={radius}/>
            : <></>}
          </g>
        </g>
      </svg>
    </div>
  )
}

export default WorldMap;