/*********************************************************
* @author: Raúl Giménez Lorente
**********************************************************/

import Card from 'react-bootstrap/Card';
import { Link} from 'react-router-dom';


export default function Lista(props){
	

	return(
		
		<div id="productosresultados">
			
			<ul id="allcards">
			{props.theproducts.map((productos, index)=>{
				return(
				<div className="unproducto">
				<li key={index} id="oneCard">
					
					<Card border="info">
						<Card.Header>
							<img src={productos.thumbnail} className="imageProduct"></img>
							<h3 id="tituloProduct">{productos.title}</h3>
						</Card.Header>
      					<Card.Body>
        					<Card.Text>
          						
        					</Card.Text>
      					</Card.Body>
						<Card.Footer>
							<Link to={"/products/"+ (productos.id -1)}><button className="button-5">View Product</button></Link>
						</Card.Footer>
    				</Card>
					
				</li></div>)
				
				
			})}
			</ul>
			
		</div>
		

	);
	}