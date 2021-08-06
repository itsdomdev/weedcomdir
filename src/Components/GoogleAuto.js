import React, { useState } from 'react';
import Select, { components } from 'react-select';

import { InputGroup, FormControl } from "react-bootstrap-v5";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const Auto = () => (
    <FormControl
        className="form-control m-0"
        id="autocomplete"
    />
)
const Control = props => ({ children, ...rest }) => (
    <components.Control style={{ border:"none"}} {...rest}>
      {children}
    </components.Control>
  );

const GoogleAuto = (props) => {
  const [value, setValue] = useState(props.existingLocation);
  console.log(props.existingLocation)
  const clearVal = () => {
    setValue('')
  }
  const innerFocus = () => {
    setValue('')
  }
  const setLoc = (loc) => {
      setValue(loc)
      console.log(loc)
      props.didSetLocation(loc)
  }

  return (
    
      <GooglePlacesAutocomplete
      
      autocompletionRequest={{
        bounds: [
          { lat: 32.5295219421387, lng: -124.482009887695 },
          { lat: 42.0095024108887,lng: -114.13077545166 }
        ],
        componentRestrictions: {
            country: "us"
        },
        fields: ["address_components", "geometry"],
        types: ["(regions)"]
      }}
      
    //   selectProps={{
        
    //   }}
        selectProps={{
            // value,
            onChange: setLoc,
            // onInputChange: setValue,
            // onFocus: clearVal,
            placeholder:"Enter Location",
            // defaultValue: value,
            // menuIsOpen:true,
            ...((value && value.length > 0)  && {defaultValue: { label: value, value: value }})
            // inputValue: value,
            
            // inputValue: value,
            // onInputChange: setValue,
            ,
          styles:{
            control: (base) => ({ ...base, 
              width:"100%", 
              display: "grid",
              gridTemplateColumns: "80% auto",
              border: "none !important", boxShadow: "none !important", outline: "none !important" }),
            container: (base) => ({ ...base, width:"100%", border: "none !important", boxShadow: "none !important", outline: "none !important" }),
            clearIndicator: (base) => ({ ...base, border: "none !important", boxShadow: "none !important", outline: "none !important" }),
            placeholder: base => ({
                ...base,
                // paddingLeft:"1em",
                pointerEvents: "none",
                textTransform:"capitalize",
                color:"#b2bec3 !important"
              }),
              singleValue: base => ({
                ...base,
                // paddingLeft:"1em",
                textTransform:"capitalize",
                pointerEvents: "none",
              }),
              menu: base => ({ ...base, zIndex:999 }),
              // menuList: base => ({ ...base, zIndex:999999 }),
              Input: base => ({
                ...base,
                // paddingLeft:"1em"
              }),
              option: (provided, state) => ({
                ...provided,
                // borderBottom: '1px dotted pink',
                background: (state.isFocused) ? 'rgba(0,0,0,0.25) !important' : '#ffffff',
                // color: (state.isSelected || state.isFocused) ? '#fff' : 'transparent',
                color:'#000',
                // padding: 20,
              }),
              valueContainer: base => ({
                ...base,
                boxShadow: "none !important", 
                border: "none !important",
                outline: "none !important"
              }),
          },
        
          components:{
            Input: (props ) => (
                <FormControl
                {...props}
                className="form-control m-0"
                id="autocomplete"
                onFocus={(event) => event.target.select()}
                // defaultValue={value}

                
                style={{outline:"none !important", boxShadow: "none !important", border: "none !important"}}
                
                
            />
            ),
            Control: ({ children, ...rest }) => (
                <components.Control {...rest} style={{outline:"none !important", boxShadow: "none !important", border: "none !important"}}>
                  {children}
                </components.Control>
              ),
              ValueContainer: ({ children, ...props }) => (
                <components.ValueContainer className="val-cont-gauto" style={{outline:"none !important", boxShadow: "none !important", border: "none !important"}} {...props}>{children}</components.ValueContainer>
              ),
              SingleValue: ({ children, ...props }) => (
                <components.SingleValue className="single-val-gauto" {...props}>{children}</components.SingleValue>
              ),
              Placeholder:({ children, ...props }) => (<components.Placeholder {...props} style={{pointerEvents: "none"}}>{children}</components.Placeholder>),
              DropdownIndicator:() => null, 
              
              IndicatorSeparator:() => null
          }
        
        //   components:{{Input: Auto}{Control: Control}}
          
        }}
   
          
          
        //   innerProps: {
        //     id: 'autocomplete', // string
        //     className: 'form-control m-0'
        //   },
        // }}
      />
    
  );
}

export default GoogleAuto