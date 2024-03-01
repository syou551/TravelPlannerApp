'use client';
import React, {useEffect, useState} from 'react';
import { useJsApiLoader } from '@react-google-maps/api'

const Table = ({pins}:{pins? : string[]})=>{
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        libraries: ["places","geocoding"],
        language: 'ja',
      })
    //#region State
    const [places, setPlaces] = useState<google.maps.GeocoderResult[]>();
    //#endregion

    //#region 関数宣言
    //placeId一覧から詳細情報をセットする
    const getInfo = () =>{
        var geocoder = new google.maps.Geocoder();
        const ids : google.maps.GeocoderResult[] = [];
        pins?.map((p)=>{
            geocoder.geocode({placeId: p})
            .then(({results})=>{
                if(results.length)ids.push(results[0]);
                setPlaces(ids);
            })
        });
    };
    //#endregion

    if(isLoaded)getInfo();

    return(
        <>
        { isLoaded ? (
            <div className="flex">
                {places ? <>{places![0].geometry.location.lat()}</> : <div>loading...</div>}
            </div>
        ):(
            <p>loading...</p>
        )}
    </>
    )
}

export default Table;