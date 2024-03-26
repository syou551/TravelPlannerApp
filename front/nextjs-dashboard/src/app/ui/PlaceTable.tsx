'use client';
import React, {useEffect, useState, memo} from 'react';
import { useJsApiLoader } from '@react-google-maps/api'

//searchの検索結果一覧Tableを表示するだけのComponentとしている
//‘他の関数に今のところ意味なし
const Table = ({places}:{places? : google.maps.places.PlaceResult[]})=>{
    const { isLoaded, loadError } = useJsApiLoader({
        id: "google-map",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
        libraries: ["places","geocoding"],
        language: 'ja',
      })


    //#region State
    const [latlng, setLatlng] = useState<google.maps.GeocoderResult[]>();
    //#endregion

    //#region 関数宣言
    //placeId一覧から詳細情報をセットする
    const getInfo = () =>{
        var geocoder = new google.maps.Geocoder();
        const ids : google.maps.GeocoderResult[] = [];
        ids?.map((p)=>{
            geocoder.geocode({placeId: ""})
            .then(({results})=>{
                if(results.length)ids.push(results[0]);
                setLatlng(ids);
            })
        });
    };
    //#endregion

    //詳細情報を取得する処理を記述

    return(
        <>
        {/* isLoaded ? (
            <div className="flex">
                {places ? <>{places![0].geometry.location.lat()}</> : <div>loading...</div>}
            </div>
        ):(
            <p>loading...</p>
        )*/}
        <div className='flex justify-center items-center w-full ml-5 mt-3 mr-5'>
        <table className='table-auto'>
            <thead className='bg-gray-100'>
                <tr>
                    <th className='px-4 py-2 md:px-16 lg:px-24'>No</th>
                    <th className='px-4 py-2 md:px-16 lg:px-24'>Name</th>
                    <th className='px-4 py-2 md:px-16 lg:px-24'>Address</th>
                    <th className='px-4 py-2 md:px-16 lg:px-24'>Other</th>
                </tr>
            </thead>
            <tbody>
                <tr key={3}>
                    <td className='px-4 py-2 md:px-16 lg:px-24'>{3+1}</td>
                    <td className='px-4 py-2 md:px-16 lg:px-24'>{"hoge"}</td>
                    <td className='px-4 py-2 md:px-16 lg:px-24'>{"addr"}</td>
                    <td className='px-4 py-2 md:px-16 lg:px-24'>
                        <button className='flex rounded-md justify-center px-4 py-2 bg-blue-100 hover:bg-blue-400 hover:text-white'>Add</button>
                    </td>
                </tr>
            {places?.map((p,index)=>(
                <tr key={index}>
                    <td className='px-4 py-2 md:px-16 lg:px-24'>{index+1}</td>
                    <td className='px-4 py-2 md:px-16 lg:px-24'>{p.name}</td>
                    <td className='px-4 py-2 md:px-16 lg:px-24'>{p.adr_address}</td>
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