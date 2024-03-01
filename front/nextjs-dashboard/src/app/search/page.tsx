import Map from "@/app/ui/Map";
import Table from "@/app/ui/PlaceTable";
import Search from "@/app/ui/Search"
import { GoogleMap, MarkerF, useLoadScript, useJsApiLoader, Libraries } from '@react-google-maps/api'


export default function Page({searchParams}:{
  searchParams? :{
    id?: string,
  }
}) {
  
  //DBからplaceID一覧を取得して表示
  var placeIDs : string[] = ["ChIJ3-glNDnkAGARQplx_kB1WaE"];
  
  return (
    <div>
      <p>Dashboard Page</p>
      <Search></Search>
    </div>
  );
}