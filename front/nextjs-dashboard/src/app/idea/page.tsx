import Map from "@/app/ui/Map";
import Table from "@/app/ui/Table";
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
      <p className="flex justify-center text-xl py-3 rounded-md bg-green-100 mb-2">IdeaId: {searchParams?.id ? searchParams?.id!: " noFound"}</p>

      <Map pins={placeIDs}/>
    </div>
  );
}