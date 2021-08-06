import React, { Component } from "react";
import { InputGroup, FormControl } from "react-bootstrap-v5";
import { Link, Route, Switch } from "react-router-dom";


class Header extends React.Component {

    constructor(props){
        super(props);
        
    }
    

    render() {

        return (
            <>
            <header id="site-header" className="black">
                <div className="container-xxxl">
                    <div className="row align-items-center justify-space-between">
                    <div className="col-2">
                    <div className="logo-wrap">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        // xmlns:xlink="http://www.w3.org/1999/xlink"
                        width="243"
                        height="37"
                        viewBox="0 0 243 37"
                        >
                        <defs>
                            <pattern
                            id="pattern"
                            preserveAspectRatio="none"
                            width="100%"
                            height="100%"
                            viewBox="0 0 837 126">
                            <image
                            width="837"
                            height="126"
                            href="data:image/png;base64,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"
                            />
                            </pattern>
                        </defs>
                        <rect
                            id="Image_3"
                            data-name="Image 3"
                            width="243"
                            height="37"
                            fill="url(#pattern)"
                        />
                        </svg>
                    </div>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-6">
                    <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-search"
                            viewBox="0 0 16 16"
                            >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg></InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl />
                    <InputGroup.Prepend>
                        <InputGroup.Text>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-geo-fill"
                            viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/></svg>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl />
                        </InputGroup>
                    <div id="main-search" className="input-group mb-3">
                        
                        <div className="inputs-wrap d-flex">
                        <span className="input-group-text"
                            ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-search"
                            viewBox="0 0 16 16"
                            >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg></span>
                        <input
                            type="text"
                            placeholder="Name Or Keyword"
                            className="form-control m-0"
                        />
                        <span className="input-group-text locpin"
                            >
                                <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-geo-fill"
                            viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"/></svg
                        ></span>
                        <input
                            type="text"
                            className="form-control m-0"
                            id="autocomplete"
                            placeholder="Choose Location"
                            aria-label="Search By Location Or Name…"
                            aria-describedby="button-addon2"
                        />
                        </div>
                        <button className="btn btn-success" type="button" id="button-addon2">
                        Search
                        </button>
                    </div>
                    <div className="text-center">
                        
                        <button type="button" className="btn btn-custom">
                        Enter Your Address To View Personalized Delivery Options
                        </button>
                    </div>
                    </div>
                    <div className="col" style={{display: "none"}}>
                    <div id="stick-wrap" className="input-group input-group-sm w-50">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Search By Location Or Name…"
                        aria-label="Search By Location Or Name…"
                        aria-describedby="button-addon2"
                        />
                        <button className="btn btn-success" type="button" id="button-addon2">
                        Search
                        </button>
                    </div>
                    </div>
                    </div>
                </div>
                </header>
                <section id="top-tabs">
                <div className="container-max">
                    <div>
                    <div className="col">
                    <ul className="nav-tabs">
                        <li id="nav-tab1" className="tab active"><span>Delivery</span></li>
                        <li id="nav-tab2" className="tab">
                        <span>Dispensaries</span>
                        </li>
                        <li id="nav-tab3" className="tab">
                        <span>Doctors</span>
                        </li>
                    </ul>
                    </div>
                    </div>
                </div>
                </section>
                </>
        );
    }
}


export default Header;