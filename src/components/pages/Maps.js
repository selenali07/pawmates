import React, { useState, useEffect } from "react"
import MatchComponent from '../MatchComponent'
import '../Maps.css'
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import {v4 as uuid} from "uuid"
import firebase from "firebase"
import Search from '../Search'
import {
   GoogleMap,
   useLoadScript,
   Marker,
   InfoWindow,
   MarkerClusterer,
} from "@react-google-maps/api"
import usePlacesAutocomplete, {
   getGeocode,
   getLatLng,
} from "use-places-autocomplete"
import {
   Combobox,
   ComboboxInput,
   ComboboxPopover,
   ComboboxList,
   ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
// import '../../App.css';
import Footer from '../Footer';
 
export default function Maps() {
   const [error, setError] = useState("");
   const { currentUser, logout } = useAuth();
   const [tasks, setTasks] = useState([]);
   const {posts, setPost} = useState([]);
   const [count, setCount] = useState(1);
   const [count_2, setCount_2] = useState(0);
   const history = useHistory();
   let array = {};
   let array2 = [];
   let list = {};
   const id = currentUser.uid;
 
   const [markers, setMarkers] = React.useState([])
   const [coor, setCoor] = useState([])
   const [center, setCenter] = useState([])
 
   useEffect(()=>{
       const fetch = [];
       const coordArr = []
       const upload = firebase.database().ref('users/'+id);
       // console.log(upload);
       const listener = upload.on('value', (snapshot)=>{
           // let data = snapshot.val() ? snapshot.val() : {};
           const gate = [];
           let x = 0
           snapshot.forEach(data=>{
               const key = data.key;
               const value = data.val();
               fetch.push({id: key, ...value});
               //lat & lng for map
               const lat = data.val().lat;
               const lng = data.val().lng;
               coordArr.push({"lat": lat, "lng": lng});
               setCenter({"lat": lat, "lng": lng})
               if (x === 0) { setCenter({"lat": lat, "lng": lng}) }
               x++
               });
           setTasks(fetch);
           setCoor(coordArr);
       });
       return () => upload.off('value',listener);
       },[firebase.database()]);
 
       const libraries = ["places"]
       const mapContainerStyle = {
       width: "100%",
       height: "100%",
       }
  
       const defaultCenter = {
        lat: 29.431585,
        lng: 106.912254,
       }
 
       const options = {
           // disableDefaultUI: true,
           // zoomControl: true,
       }
 
       const mapRef = React.useRef()
       const onMapLoad = React.useCallback((map) => {
           mapRef.current = map
       }, [])
 
       const panTo = React.useCallback(({lat, lng}) => {
           mapRef.current.panTo({lat, lng})
           mapRef.current.setZoom(11)
       }, [])
       console.log(panTo)
  
       const{ isLoaded, loadError } = useLoadScript({
           googleMapsApiKey: "AIzaSyAC2OJTaULZCcT94r30F2fhhzHBClJWGTU",
           libraries,
       })
  
       if (loadError) return "Error loading maps"
       if (!isLoaded) return "Loading Maps"
 
   let mapPets = () => {
       return coor.map(x => x)
   }
 
   let mapCenter = () => { //render Center of map
       try {
           return (center.length == 0) ? defaultCenter : center
       }
       catch {
           return defaultCenter
       }
   }
 
   let newArr = markers.concat(mapPets())
   const renderMatchComponent = tasks.map( x => <MatchComponent key={x.id} adopt = {x.url}status={x.like} city = {x.City} state = {x.State} name={x.Name} gender={x.Gender} age={x.Age} breed={x.Breed} photo={x.Photo}/>)
 
  
   return (
       <>
           <div className='maps'>
               <div id="side-scroll">
                   <h2>Paw-fect Match</h2>
                   <div id="paw-fect">
                       {renderMatchComponent}
                   </div>
               </div>
               <div id="explore">
 
               <Search panTo={panTo}/>
               <GoogleMap
                   mapContainerStyle={mapContainerStyle}
                   zoom={8}
                   center= {mapCenter()}
                   options={options}
                   onLoad={onMapLoad}
               >
                   {newArr.map(marker =>
                       <Marker
                           key={uuid()}
                           position={{ lat: marker.lat, lng: marker.lng }}
                           />)}
               </GoogleMap>
               </div>
           </div>
       </>
   );
}