import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import {v4 as uuid} from "uuid"
import firebase from "firebase"
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
 
export default function Search ({panTo}) {
   const {
       ready,
       value,
       suggestions: {status, data},
       setValue,
       clearSuggestions,
   } = usePlacesAutocomplete({
       requestOptions: {
           location: {lat: () => 29.431585, lng: () => 106.912254},
           radius: 2000 //meters
       },
   });
 
   return (
       <div className="searchbox">
           <Combobox
               onSelect={async(address) => {
 
                   setValue(address, false)
                   clearSuggestions()
               try {
                   const results = await getGeocode({address})
                   const { lat, lng } = await getLatLng(results[0])
                   panTo({ lat, lng })
               }
               catch (error) {
               }
           }}
           >
               <ComboboxInput
               value={value}
               onChange={(e) => {
                   setValue(e.target.value)
               }}
               disabled={!ready}
               placeholder="Enter Address"
               />
               <ComboboxPopover>
                   <ComboboxList>
                       {status === "OK" &&
                       data.map(({ id, description}) => (
                           <ComboboxOption key={id} value={description} />
                       ))}
                   </ComboboxList>
               </ComboboxPopover>
           </Combobox>
       </div>
   )
}
