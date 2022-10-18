/*********************************************************
* @author: Raúl Giménez Lorente
**********************************************************/
import { useCallback, useEffect, useRef, useState } from 'react';
import Lista from './Lista';
import {mockdata} from './constants/products';
import CONFIG from './config/config';

export default function SearchPage(props){
	const[filteredData, setFilteredData] = useState("");

	const[isLoading, setIsLoading] = useState(true);
	const[catChosen, setCatChosen] = useState("");

	const[data, setData] = useState(props.theproducts);

	var arrayCategoriesAux = props.theproducts
	.reduce((acc, product)=>
	[...acc, product.category], [])
	.filter(function(product, position, self) {
		return self.indexOf(product) === position;
	});

	const handleChangeInput = event => {
		setFilteredData(event.target.value);
	  };

	const filterByCategory = (event) =>
	{
		var finalDataToShow;
		
		setCatChosen(event);
		
		/*******************
		* Filter by category
		********************/
		if(event !== "All"){
			finalDataToShow = props.theproducts.filter((product)=>{
				if(product.category === event)
					return product;
				})
				
		}else{
			finalDataToShow = props.theproducts;
		}
		setData(finalDataToShow);
	}
	const filterByInput = () =>{
		/*******************
		* Filter by search
		********************/
		var finalDataToShowAux = props.theproducts.filter(product=>{
			if(filteredData === ""){
				return product;
			}else if(product.title.toLowerCase().includes(filteredData.toLowerCase())){
				return product;
			}
		})
		if(filteredData !== ""){
			setData(finalDataToShowAux);
		}else{
			setData(props.theproducts);
		}
		

	}
	
	const fetchData = () => {
		
				
		filterByInput();
		setIsLoading(false);			
			
		};

	
	return(
		<div>
			<h2 id="catálogo"> My Shop</h2>
			
			
			<div className='boxFilter'>
				<h3 id="filterAndSearch">Search</h3>
				
				<input id="filtro" className="growing-search" placeholder="Let me search that..."
				onChange={handleChangeInput} value={filteredData}></input>
				<button id="buscador" className="button-5" onClick={fetchData}>Search</button>
			</div>
			<div className='boxFilter'>
				<h3 id="filterAndSearch">Filter</h3>
				
			<select id="selector" value={catChosen} onChange={(e)=>{filterByCategory(e.target.value)}}>
				<option>All</option>
				{ 
				arrayCategoriesAux
				.map((category) =>{
					return (<option onClick={filterByCategory} >{category}</option>)
				})}
			</select>
		
			</div>
			<div id="lista"><Lista theproducts={data}/></div>
			
			
		</div>
	);
	}