'use client'

import Map from "@/app/ui/Map";
import Table from "@/app/ui/PlaceTable";
import Search from "@/app/ui/Search"
import Header from "@/app/ui/Header"
import { GoogleMap, MarkerF, useLoadScript, useJsApiLoader, Libraries } from '@react-google-maps/api'
import { useContext } from "react";

export default function Page({searchParams}:{
  searchParams? :{
    id?: string,
  }
}) {
  
  //DBからplaceID一覧を取得して表示
  var placeIDs : string[] = ["ChIJ3-glNDnkAGARQplx_kB1WaE"];
  var map : google.maps.Map;

  return (
    <div>
      <Header></Header>
      <p>Search Page</p>
      <Search></Search>
    </div>
  );
}