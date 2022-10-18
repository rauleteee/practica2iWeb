import logo from './logo.svg';
import './App.css';
import Header from './Header';
import NoMatch from './NoMatch';
import { useEffect, useState } from 'react';
import CONFIG from './config/config';
import {mockdata} from "./constants/products";
import SearchPage from './SearchPage';
import { Spinner } from 'react-bootstrap';

import { Routes, Route} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import OneProduct from './OneProduct';
function App() {
	const[loading, setLoading] = useState(true);
	const navigate = useNavigate();
	const SERVER_URL = CONFIG.server_url;
	const[data, setData] = useState("");

const download = async () => {
	let products;
	
	if(CONFIG.use_server){
		try {
			const res = await fetch(SERVER_URL);
			products = await res.json();
			console.log(products);
			setData(products.products)
		} catch (e) {
			alert("No se ha podido recuperar la información.");
		}
	}
	else{
		await setData(mockdata.products);
	}

}
useEffect(() => {
    async function fetchData() {
      await download();		
			setTimeout(()=>{
				setLoading(false);
			},500);		
    }

    fetchData();
  }, []);

  return (
    
    <div className="App">
      
        
       <Header/>
	   {loading ? <div className='spinner' id="loading"><Spinner/></div>: 
	   <Routes>
	   	<Route path="/" element={<SearchPage theproducts={data} />}/>
	  	<Route path="/products/:productId" element={<OneProduct theproducts={data} />}/>
		<Route path="*" element={<NoMatch/>}/>
	  </Routes>}
    </div>
  );
}

export default App;
