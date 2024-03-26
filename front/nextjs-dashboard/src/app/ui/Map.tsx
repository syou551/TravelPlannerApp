"use client";

import React, { useEffect, useRef, useState, useCallback, memo, createContext } from 'react';
import { GoogleMap, MarkerF, useLoadScript, useJsApiLoader, Libraries } from '@react-google-maps/api'
import { Library } from '@googlemaps/js-api-loader';

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
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [places, setPlaces] = useState<google.maps.LatLng[] | null>(null);
    const [ids, setIds] = useState<string[]>([]);

    //#endregion
    
    //#region event
    const onLoad = (map: google.maps.Map) => {
        map.setCenter(center);
        map.setZoom(13);
        console.log("init...");
        setMap(map);
        if(pins != ids){
            makeMarker(pins);
        }
    };

    const onUnmount = useCallback(() => {}, []);
    //#endregion

    //placeId一覧からLatLngをセットする
    const makeMarker = (placeIdArray : string[] | undefined) =>{
        console.log("")
        var geocoder = new google.maps.Geocoder();
        const places : google.maps.LatLng[] = [];
        placeIdArray?.map((p)=>{
            geocoder.geocode({placeId: p})
            .then(({results})=>{
                results.map((p)=>places.push(p.geometry?.location))
                setPlaces(places);
                setIds(placeIdArray!);
            })
        });
        
        
    };

    if(ids.length != 0 && ids != pins){
        makeMarker(pins);
    }

    return (
        <div className="flex justify-center items-center">
            {isLoaded ? (
                <GoogleMap mapContainerStyle={containerStyle} onLoad={onLoad} zoom={10}>
                    {(places?.length !== 0 )? places?.map((value, index)=>(<MarkerF key={index} position={value} label={markerLabel(index)}></MarkerF>)):<></>}
                </GoogleMap>
            ) : (
                <p className='flex text-2xl tm-10'>loading...</p>
            )}
        </div>
    );
};
  
export default memo(Map);