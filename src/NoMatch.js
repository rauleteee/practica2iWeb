/*********************************************************
* @author: Raúl Giménez Lorente
**********************************************************/
import { Link } from "react-router-dom";

export default function NoMatch(props){
	return(
		<div>
			<h1 id="info">Ruta no encontrada</h1>
			<Link to="/"><button className="button-5" id="volver">Go back</button></Link>
		</div>
	);
	}