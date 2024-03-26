import Map from "@/app/ui/Map";
import Table from "@/app/ui/PlaceTable";
import Search from "@/app/ui/Search";


export default function Page({searchParams}:{
  searchParams? :{
    id?: string,
  }
}) {
  
  //DBからplaceID一覧を取得して表示
  var placeIDs : string[] = ["ChIJ3-glNDnkAGARQplx_kB1WaE"];
  
  return (
    <div>
      <p>Idea Page</p>
      <Map pins={["ChIJ3-glNDnkAGARQplx_kB1WaE"]}/>
      {/*Table要素*/}
      {/*<Table pins={placeIDs}></Table>*/}
    </div>
  );
}