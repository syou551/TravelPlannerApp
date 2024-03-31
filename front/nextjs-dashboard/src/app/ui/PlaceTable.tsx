'use client';
import React, {useEffect, useState, memo} from 'react';
import { useJsApiLoader } from '@react-google-maps/api'

//searchの検索結果一覧Tableを表示するだけのComponentとしている
//‘他の関数に今のところ意味なし
const header : string[] = ["No","Name","Address","Other"];

const Table = ({places}:{places? : google.maps.places.PlaceResult[]})=>{

    //SearchPlacesで一括取得できるので以下の関数は不要
    /*
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        libraries: ["places","geocoding"],
        language: 'ja',
      })


    //#region State
    const [info, setInfo] = useState<google.maps.GeocoderResult[]>([]);
    const [place, setPlace] = useState<google.maps.places.PlaceResult[]>();
    //#endregion

    //#region 関数宣言
    //placeId一覧から詳細情報をセットする
    const getInfo = () =>{
        var geocoder = new google.maps.Geocoder();
        var ids : string[] = [];
        info.splice(0);
        places?.map((p)=>{if(!ids.includes(p.place_id!))ids.push(p.place_id!)});
        ids?.map((p)=>{
            geocoder.geocode({placeId: p})
            .then(({results})=>{
                if(results.length) {
                    const infocpy = info;
                    infocpy?.push(results[0]);
                    setInfo(infocpy);
                    setPlace(places);
                }
            })
        });
    };

    //追加の処理

    //#endregion

    if(places != place){
        getInfo();
        console.log("get...");
    }
    //詳細情報を取得する処理を記述
    */
    return(
        <>
        <div className='flex justify-center items-center w-full ml-5 mt-3 mr-5'>
        <table className='table-auto'>
            <thead className='bg-gray-100'>
                <tr>
                    {header.map((p,index)=>(
                        <th className='px-4 py-2 md:px-16 lg:px-24' key={index}>{p}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {places?.map((p,index)=>(
                <tr key={index}>
                    <td className='px-4 py-2 '>{index+1}</td>
                    <td className='px-4 py-2 '>{p.name}</td>
                    <td className='px-4 py-2 '>{p.formatted_address}</td>
                    <td className='px-4 py-2 md:px-16 lg:px-24'>
                        <button className='flex rounded-md justify-center px-4 py-2 bg-blue-100 hover:bg-blue-400 hover:text-white'>Add</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
        </>
    )
}

export default memo(Table);