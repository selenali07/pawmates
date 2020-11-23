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
  
    // const [markers, setMarkers] = React.useState([])
    const [coor, setCoor] = useState([])
    const [center, setCenter] = useState([])
    const [selectedMarker, setSelectedMarker] = React.useState(null)
    const [arrOfPetObj, setArrOfPetObj] = useState([])
  
  
  
    useEffect(()=>{
        const fetch = [];
        const coordArr = []
        const arrPets = [];
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
                if (x === 0) { setCenter({"lat": lat, "lng": lng}) } //set center-coor to 1st pet on list
                x++
                //arrOfPetObj
                const name = data.val().Name;
                const photo = data.val().Photo;
                arrPets.push({"lat": lat, "lng": lng, "name": name, "photo": photo})
                });
            setTasks(fetch);
            setCoor(coordArr);
            setArrOfPetObj(arrPets);
        });
        return () => upload.off('value',listener);
        },[firebase.database()]);
  
        const libraries = ["places"]
        const mapContainerStyle = {
        width: "100%",
        height: "100%",
        }
   
        const defaultCenter = { //default to Chongqing, China
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
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
            libraries,
        })
   
        if (loadError) return "Error loading maps"
        if (!isLoaded) return "Loading Maps"
  
    // let returnCoorObj = () => {
    //     return coor.map(x => x)
    // }
  
    let mapCenter = () => { //render Center of map
        try {
            return (center.length == 0) ? defaultCenter : center
        }
        catch {
            return defaultCenter
        }
    }
  
    const renderMatchComponent = tasks.map( x =>
        <MatchComponent
            key={x.id}
            name={x.Name}
            url={x.url}
            phone={x.phone}
            email={x.email}
            gender={x.Gender}
            age={x.Age}
            breed={x.Breed}
            photo={x.Photo}
        />)
  
    let renderPetsOnMarker = (lng, lat, nameORphoto) => {
        let allNames = ""
        let allPhotos = ""
        let returnNames = arrOfPetObj.filter( x => {
            if(lng == x.lng && lat == x.lat) {
                (allNames != "") ?
                    allNames = allNames.concat(", " + x.name) :
                    allNames = allNames.concat(x.name)

                    allPhotos = allPhotos.concat(x.photo)
            }
        })
        return (nameORphoto === "name") ? allNames : allPhotos
    }
  
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
                    zoom={9}
                    center= {mapCenter()}
                    options={options}
                    onLoad={onMapLoad}
                >
                    {coor.map(marker => (
                        <Marker
                            key={uuid()}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            onClick={() => {
                                setSelectedMarker(marker)
                            }}
                            />
                    ))}
  
                    {selectedMarker ?
                    (<InfoWindow position={{ lat: selectedMarker.lat, lng: selectedMarker.lng}}
                    onCloseClick={() => {
                        setSelectedMarker(null)
                    }}>
                        <div>
                            <span id="nameMarker">{renderPetsOnMarker(selectedMarker.lng, selectedMarker.lat, "name")}</span>
                            <img id="picMarker" src={renderPetsOnMarker(selectedMarker.lng, selectedMarker.lat, "photo")}/>
                        </div>
                    </InfoWindow>) : null}
                </GoogleMap>
                </div>
            </div>
        </>
    );
 }
 