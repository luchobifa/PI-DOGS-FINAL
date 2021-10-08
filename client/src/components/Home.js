import React from 'react';
import Footer from './Footer';
import Dogs from './Dogs'
//import styles from '../css/Home.module.css'
import SearchBar from './SearchBar';
import Filters from './Filters';

export default function Home(){
    return(
        <div>
            <SearchBar/>
            <Filters/>
            <Dogs/>
            <Footer/>
        </div>
    )
}