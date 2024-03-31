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
  
  //IdeaIDを追加関数に渡せるようにする必要がある＝＞useContext?

  return (
    <div>
      <Header></Header>
      {/*<p>Search Page</p>*/}
      <Search></Search>
    </div>
  );
}