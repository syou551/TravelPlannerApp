"use client";

import React, { useEffect, useRef, useState, useCallback, memo, createContext } from 'react';
import { GoogleMap, MarkerF, useLoadScript, useJsApiLoader, Libraries } from '@react-google-maps/api'
import { Library } from '@googlemaps/js-api-loader';
import Table from "@/app/ui/Table"
import Link from 'next/link';

//#region Style
const containerStyle = {
    width: "100%",
    height: "86vh",
  };
  
const center = {
    lat: 34.7293466708865,
    lng: 135.49939605607292,
  };
  
const zoom = 20;
const markerLabel = (index : number): google.maps.MarkerLabel =>{
    const strIndex : string = (index+1)?.toString()!;
    return ( {
      text: strIndex,
      color: "white",
      fontFamily: "sans-serif",
      fontSize: "20px",
      fontWeight: "bold",
    })
  };
  //#endregion

const Map = ({pins}:{pins? : string[]}) => {
    //API読み込み
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        libraries: ["places","geocoding"],
        language: 'ja',
      })

    //#region State
    const [map, setMap] = useState<google.maps.Map>();
    const [places, setPlaces] = useState<google.maps.LatLng[]>([]);
    const [results, setResults] = useState<google.maps.places.PlaceResult[]>([]);
    const [ids, setIds] = useState<string[]>([]);

    //#endregion
    
    //#region event
    const onLoad = (map: google.maps.Map) => {
        map.setCenter(center);
        map.setZoom(13);
        console.log("init...");
        setMap(map);
        if(pins != ids){
            makeMarker(pins, map);
        }
    };

    const onUnmount = useCallback(() => {}, []);
    const callback = (place: google.maps.places.PlaceResult|null, status: google.maps.places.PlacesServiceStatus)=>{
        const result = places;
        const data = results;
        if(!data.includes(place!)) data.push(place!);
        if(!result.includes(place?.geometry?.location!))result?.push(place?.geometry?.location!);
        console.log(place?.name, place?.geometry?.location?.lat());
        map?.setCenter(place?.geometry?.location!);
        setMap(map);
        setPlaces(result);
        setResults(data);
    }
    
    //#endregion

    //placeId一覧からLatLngをセットする
    const makeMarker = (placeIdArray : string[] | undefined, map: google.maps.Map) =>{
        console.log("")
        var service = new google.maps.places.PlacesService(map);
        placeIdArray?.map((p)=>
            service.getDetails({placeId: p, fields: ['All']}, (place, status)=>callback(place,status)));
        setIds(placeIdArray!);
    };

    if(ids.length != 0 && ids != pins){
        makeMarker(pins, map!);
    }

    return (
        <div className="flex justify-center flex-col items-center">
            {isLoaded ? (
                <>
                <div className='flex w-full justify-center'>
                    <GoogleMap mapContainerStyle={containerStyle} onLoad={onLoad} zoom={10}>
                        {(places?.length !== 0 )? places?.map((value, index)=>(<MarkerF key={index} position={value} label={markerLabel(index)}></MarkerF>)):<></>}
                    </GoogleMap>
                </div>
                <div className='flex gap-2'>
                    <button className="flex py-2 px-3 rounded-md bg-blue-100 mt-2 hover:bg-blue-400 hover:text-white">
                        <Link href="/search">Search</Link>
                    </button>
                    <button className="flex py-2 px-3 rounded-md bg-blue-100 mt-2 hover:bg-blue-400 hover:text-white">
                        <Link href="/search">{"Member's Times ID"}</Link>
                    </button>
                </div>
                <div className='flex w-full justify-center'>
                    <Table places={results}></Table>
                </div>
                </>
            ) : (
                <p className='flex text-2xl tm-10'>loading...</p>
            )}
        </div>
    );
};
  
export default memo(Map);