import {React, useEffect} from "react"
import {useSelector, useDispatch} from 'react-redux'
import { getTemperaments, filterByTemp, order, getDogsFiltered} from "../actions"
import styles from '../css/Filters.module.css'

export default function Filters(){
    // let [filter, setFilter] =  useState('');

    const allDogsCopy = useSelector((state)=> state.allDogs)
    const temps = useSelector((state)=> state.temperaments);
    //const allDogs = useSelector((state)=> state.filteredDogs)
    const dispatch =  useDispatch();
    
    useEffect(()=>{
        dispatch(getTemperaments());
    }, [dispatch]);
 
    function handleChangeTemps(e){
        // setFilter(e.target.value);
        //si pongo filter hay delay
        dispatch(filterByTemp(e.target.value))
    }
    
    function handleChangeBreeds(e){
        // setFilter(e.target.value);
        dispatch(getDogsFiltered(e.target.value))
    }

    function handleChangeOrder(e){
        // setBreed(e.target.value);
        dispatch(order(e.target.value))
    }
    
   return(
       <div className = {styles.conteiner}>
           <form className= {styles.filters}>
                <select className = {styles.select} onChange = {handleChangeBreeds} defaultValue = "Select Breed">
                    <option value = 'Select Breed' disabled>Select Breed </option>
                    <option value = 'All Breeds' >All Breeds</option>
                    {
                        allDogsCopy.map(d => <option key = {d.name}>{d.name}</option>)
                    }
                </select>

                <select className = {styles.select} onChange = {handleChangeTemps} defaultValue = "Select Temperament">
                    <option value = 'Select Temperament'  disabled>Select Temperament </option>
                    <option value = 'All Temperaments' >All Temperaments</option>
                    {
                        temps.map(t => <option key = {t.name}>{t.name}</option>)
                    }
                </select>

                <select className = {styles.select} onChange = {handleChangeOrder} defaultValue = 'Order by'>
                    <option value = 'Order by'  disabled>Order by</option>
                    <option value = 'asc'>A - Z </option>
                    <option value = 'desc'>Z - A</option>
                    <option value = 'max_weight'>max weight</option>
                    <option value = 'min_weight'>min weight</option>
                </select>
            </form>
       </div>
        
    )
}