/*********************************************************
* @author: Raúl Giménez Lorente
**********************************************************/
import { useState, useEffect, useRef } from 'react';
import Card from 'react-bootstrap/Card';
import {Link, useParams} from 'react-router-dom';
import App from './App';
import{Route, Routes} from 'react-router-dom';
import  Location  from './Location';

export default function OneProduct(props){
	
	let{productId} = useParams();
	let position = productId;
	const [index, setIndex] = useState(1);
	const timeoutRef = useRef(null);
	const delay = 2500;
	function resetTimeout() {
		if (timeoutRef.current) {
		  clearTimeout(timeoutRef.current);
		}
	  }
	
	useEffect(() => {
		resetTimeout();
		timeoutRef.current = setTimeout(
		  () =>
			setIndex((prevIndex) =>
			  prevIndex === props.theproducts[position].images.length - 1 ? 1 : prevIndex + 1
			),
		  delay
		);
	
		return () => {
			resetTimeout();
		};
	  }, [index]);

	return(<div className="unproducto">
				
					<Location/>
					<Card border="info">
						<Card.Header>
						<div className="slideshow">
     					 <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        					<div className="slide"></div>
							{props.theproducts[position].images
							.map((image, index)=>{
								return(<img src={image} className="slide" key={index} style={{image}}/>)
							})}
      					</div>
    					</div>
						<div className="slideshowDots">
        				{props.theproducts[position].images
						.map((_, idx) => (
          				<div 
						key={idx} 
						className={`slideshowDot${(index) === (idx) ? " active" : ""}`}
						  onClick={() => {
							setIndex(idx);
						  }}></div>
       						 ))}
      					</div>
							<div id="titulo"><h3>{props.theproducts[position].title}</h3></div>
							
						</Card.Header>
      					<Card.Body>
        					<Card.Text>
          						<p id="descriptionProduct">{props.theproducts[position].description}</p>
								<p>Price: <strong>{props.theproducts[position].price} €</strong></p>
								<p>Rating: <strong>{props.theproducts[position].rating} / 5</strong> </p>
								<p>Stock: <strong>{props.theproducts[position].stock} uds</strong></p>
        					</Card.Text>
      					</Card.Body>
						<Card.Footer>
						<Link to="/"><button className="button-5" id="volver">Go back</button></Link>
						</Card.Footer>
    				</Card>
					
				</div>)
}