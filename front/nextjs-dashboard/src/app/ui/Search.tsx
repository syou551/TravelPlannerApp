"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleMap, MarkerF, useLoadScript, useJsApiLoader, Libraries } from '@react-google-maps/api'
import { Library } from '@googlemaps/js-api-loader';
import { text } from 'stream/consumers';
import { Content } from 'next/font/google';

//#region スタイル等
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

const Search = ({id}:{id? : string}) => {
  //API読み込み
  const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        libraries: ["places","geocoding"],
        language: 'ja',
      })

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [places, setPlaces] = useState<google.maps.LatLng[] | null>(null);
  const [query, setQuery] = useState<string>("");

  const debug = ()=>{
    console.log("load");
  }

  const placeId : string ="ChIJ3-glNDnkAGARQplx_kB1WaE";
  
  //#region 関数定義

  //#region event
  //Map読み込み時に呼ばれる
  //searchならボタンのclickなどのイベントも実装するべき
  const onLoad = (map: google.maps.Map) => {
        const bounds = new window.google.maps.LatLngBounds(center);
        (map as google.maps.Map).fitBounds(bounds);
        setMap(map);
    };

  const onSearch = ()=>{
    searchPlace(map!);
  };

  const onUnmount = useCallback(() => {}, []);
  
  //#endregion

  //#region 検索関連
  //検索結果のresultsを返す
  const searchByQuery = (m: google.maps.Map)=>{
    var service = new google.maps.places.PlacesService(m);
    const ids : google.maps.LatLng[] = [];

    var request = {
      query: '法隆寺',
      fields: ['name', 'geometry'],
    };

    service.findPlaceFromQuery(
      request,
      (results: google.maps.places.PlaceResult[] | null,
          status: google.maps.places.PlacesServiceStatus)=>{
              if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                return results;
                /*
                  m?.setCenter(results[0].geometry!.location!);
                  ids.push(results[0].geometry!.location!);*/
              }
          });

    return null;
  }

  const searchByDistance = (m: google.maps.Map)=>{
    var service = new google.maps.places.PlacesService(m);
    const ids : google.maps.LatLng[] = [];

    service.nearbySearch({
      location: { lat: center.lat, lng: center.lng },
      radius: 1000,  // 検索範囲（メートル）
      type: 'store'  // 店舗を検索
    }, (results :google.maps.places.PlaceResult[] | null ,status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        return results;
        /*
          results?.map((i)=>ids.push(i?.geometry?.location!));
          setPlaces(ids);*/
      }
    });
    return null;
  }

  const makeLatLng = (p: google.maps.places.PlaceResult[]|null)=>{
    if(!p) return;
    var ids : google.maps.LatLng[] = [];
    //ここをtypeで名前や説明を保持するようにしてTableとかで表示できるように
    p?.map((i)=>ids.push(i?.geometry?.location!));
    setPlaces(ids);
  }

  //検索のmain関数
  const searchPlace = (m : google.maps.Map): google.maps.Map =>{
    var mode = 0;
    var service = new google.maps.places.PlacesService(m);
    var places : google.maps.places.PlaceResult[]|null = [];
    var point : google.maps.LatLng[] = [];
    if(mode = 0){places = searchByQuery(m);}
    else{places = searchByDistance(m);}

    //mapにピンを立てるための関数群
    makeLatLng(places);
    return m;
  };
  //#endregion

  //#endregion
  return (
        <div>
          <div className='flex ml-5 mr-5 justify-center items-center'>
            <input type='text' className='flex w-200 rounded-md mt-2 mb-2' onChange={(e)=>setQuery(e.target.value)} value={query}></input>
            <button className='flex transition rounded-md h-full bg-blue-100 ml-4 hover:bg-blue-400 hover:text-white' onClick={onSearch}>
              <p className='flex mt-2 mb-2 ml-4 mr-4'>submit</p>
            </button>
          </div>
            {isLoaded ? (
                <>
                <GoogleMap mapContainerStyle={containerStyle} onLoad={onLoad} zoom={10}>
                    {(places?.length !== 0 )? places?.map((value, index)=>(<MarkerF key={index} position={value} label={markerLabel}></MarkerF>)):<></>}
                </GoogleMap>
                </>
            ) : (
            "loading"
            )}
        </div>
    );
};

export default Search;