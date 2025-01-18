'use client';
import React, {useEffect, useState, memo} from 'react';
import { useJsApiLoader } from '@react-google-maps/api'

const header : string[] = ["No","Name","Address","Other"];

//PlaceID一覧がPropsとして渡されるのでそれを処理してTableとして表示
const Table = ({places}:{places? : google.maps.places.PlaceResult[]})=>{

    return(
        <>
        <div className='flex justify-center items-center w-full ml-5 mt-3 mr-5'>
        <table className='table-auto'>
            <thead className='bg-gray-100'>
                <tr>
                    {header.map((p,index)=>(
                        <th className='px-4 py-2 lg:px-18' key={index}>{p}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {places?.map((p,index)=>(
                <tr key={index}>
                    <td className='px-4 py-2 lg:px-15'>{index+1}</td>
                    <td className='px-4 py-2 lg:px-15'>{p?.name!}</td>
                    <td className='px-4 py-2 lg:px-15'>{p?.formatted_address!}</td>
                    <td className='px-4 py-2 lg:px-15'>
                        <button className='flex rounded-md justify-center px-4 py-2 hover:bg-gray-200'>...</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
        </>
    )
}

export default Table;