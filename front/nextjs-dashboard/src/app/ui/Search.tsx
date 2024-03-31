"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo, useContext } from 'react';
import { GoogleMap, MarkerF, useLoadScript, useJsApiLoader, Libraries } from '@react-google-maps/api'
import { Library } from '@googlemaps/js-api-loader';
import { text } from 'stream/consumers';
import { Content } from 'next/font/google';
import SearchPlace from '@/app/actions/SearchPlace';

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
  const isLoaded = true;

  //#region Stateなど
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [places, setPlaces] = useState<google.maps.LatLng[] | null>(null);
  const [query, setQuery] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const debug = ()=>{
    console.log("load");
  }

  const placeId : string ="ChIJ3-glNDnkAGARQplx_kB1WaE";
  //#endregion
  
  //#region 関数定義

  //#region event

  const onSearch = ()=>{
    console.log("searching...");
    //const result = SearchPlace("houryuuji")
    //setPlaces(result);
    setKeyword(query);
  };
  
  //#endregion

  //#endregion
  return (
        <div>
            {isLoaded ? (
            <>
              <div className='flex ml-5 mr-5 justify-center items-center'>
                <input type='text' className='flex w-200 rounded-md mt-2 mb-2' onChange={(e)=>setQuery(e.target.value)} value={query}></input>
                <button className='flex transition rounded-md h-full bg-blue-100 ml-4 hover:bg-blue-400 hover:text-white' onClick={onSearch}>
                  <p className='flex mt-2 mb-2 ml-4 mr-4'>submit</p>
                </button>
              </div>
              <div className='flex'>
                {/*リフトアップパターンで実装　buttonが押されたときにMapなどコンポーネントが更新*/}
                <SearchPlace query={keyword}/>
              </div>
            </>
            ) : (
            "loading"
            )}
        </div>
    );
};

export default Search;