'use client'

import { GoogleMap, MarkerF, useLoadScript, useJsApiLoader, Libraries } from '@react-google-maps/api'
import { memo, useState } from "react"

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

const SearchPlace = ({query}:{query:string}) =>{ 
    console.log(query)
    //JS読み込み
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        libraries: ["places","geocoding"],
        language: 'ja',
    });


    //#region State
    const [resultsArray, setResultsArray] = useState<google.maps.places.PlaceResult[]>([]);
    var places : google.maps.LatLng[] | null = [];
    const [map, setMap] = useState<google.maps.Map>();
    const [keyword, setKeyword] = useState<string>("");
    //#endregion

    //#region event
    const onLoad = (map: google.maps.Map) => {
        console.log("init")
        map.setCenter(center);
        map.setZoom(15);
        setMap(map);
    };
    //#endregion

    //#region 検索
    //検索結果のresultsを返す
    const searchByQuery = (map : google.maps.Map ,query : string) =>{
        var service = new google.maps.places.PlacesService(map);
        var a : google.maps.places.PlaceResult[] = [];

        var request = {
        //query: '法隆寺',
        query : query,
        fields: ['name', 'geometry'],
        };

        console.log("search now:"+query);

        service.findPlaceFromQuery(
        request,
        (results: google.maps.places.PlaceResult[] | null,
            status: google.maps.places.PlacesServiceStatus)=>{
                if (status === google.maps.places.PlacesServiceStatus.OK && results && results[0] !== resultsArray[0]) {
                    console.log("find Place!:"+ results[0].geometry?.location!);
                    map.setCenter(results[0].geometry?.location!);
                    setMap(map);
                    setResultsArray(results);
                    setKeyword(query);
                }
            });
    }
    //#endregion

    //再レンダリング時の分岐
    //クエリに値があり、初めての検索の場合
    if(query.length != 0 && resultsArray.length == 0){
        places?.push(new google.maps.LatLng(center.lat,center.lng));
        searchByQuery(map!,query);
        console.log(resultsArray.length);
    //クエリに値があり、前のクエリと異なる場合、つまり再検索時
    }else if(query.length != 0 && query != keyword){
        searchByQuery(map!,query);
    }



    return (
        <>
        {isLoaded ? (
            <div className='flex w-full'>
            <p>keyword:{query}</p>
            <GoogleMap mapContainerStyle={containerStyle} onLoad={onLoad} zoom={10}>
                {(resultsArray?.length !== 0 )? resultsArray?.map((value,index)=><MarkerF key={index} position={(value as google.maps.places.PlaceResult).geometry?.location!} label={markerLabel}></MarkerF>):<></>}               
            </GoogleMap>
            </div>
        ) : (
            <p className='flex text-2xl tm-10'>loading...</p>
        )}
        </>
    );
}

 //#region 検索関連関数テンプレート
  

  const searchByDistance = (m: google.maps.Map)=>{
    var service = new google.maps.places.PlacesService(m);
    const ids : google.maps.LatLng[] = [];
    const center = {
        lat: 34.7293466708865,
        lng: 135.49939605607292,
    };

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

  const makeLatLng = (p: google.maps.places.PlaceResult[]|null) : google.maps.LatLng[] | null=>{
    if(!p) return null;
    var ids : google.maps.LatLng[] = [];
    //ここをtypeで名前や説明を保持するようにしてTableとかで表示できるように
    p?.map((i)=>ids.push(i?.geometry?.location!));
    //setPlaces(ids);
    return ids;
  }

  //検索のmain関数
  const searchPlace = (m : google.maps.Map): google.maps.Map =>{
    var mode = 0;
    var service = new google.maps.places.PlacesService(m);
    var places : google.maps.places.PlaceResult[]|null = [];
    var point : google.maps.LatLng[] = [];
    if(mode = 0){
      console.log("searching...");
      //places = searchByQuery(m);
    }
    else{places = searchByDistance(m);}

    //mapにピンを立てるための関数群
    makeLatLng(places);
    return m;
  };
  //#endregion 

export default memo(SearchPlace);