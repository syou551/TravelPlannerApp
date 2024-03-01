"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
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
const markerLabel: google.maps.MarkerLabel = {
    text: " ",
    fontFamily: "sans-serif",
    fontSize: "15px",
    fontWeight: "bold",
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

    var request = {
        query: '法隆寺',
        fields: ['name', 'geometry'],
      };

    var placeIds : string[] | undefined = ["ChIJ3-glNDnkAGARQplx_kB1WaE"];
    //#endregion
    
    //#region event
    const onLoad = (map: google.maps.Map) => {
        map.setCenter(center);
        map.setZoom(13);
        setMap(map);
        if(pins)placeIds = pins;
        makeMarker();
    };

    const onUnmount = useCallback(() => {}, []);
    //#endregion

    //placeId一覧からLatLngをセットする
    const makeMarker = () =>{
        var geocoder = new google.maps.Geocoder();
        const ids : google.maps.LatLng[] = [];
        placeIds?.map((p)=>{
            geocoder.geocode({placeId: p})
            .then(({results})=>{
                results.map((p)=>ids.push(p.geometry?.location))
                setPlaces(ids);
            })
        });
    };

    return (
        <div className="flex justify-center items-center">
            {isLoaded ? (
                <GoogleMap mapContainerStyle={containerStyle} onLoad={onLoad} zoom={10}>
                    {(places?.length !== 0 )? places?.map((value, index)=>(<MarkerF key={index} position={value} label={markerLabel}></MarkerF>)):<></>}
                </GoogleMap>
            ) : (
                <p className='flex text-2xl tm-10'>loading...</p>
            )}
        </div>
    );
};
  
export default Map;