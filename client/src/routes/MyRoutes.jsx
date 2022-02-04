import React from 'react';
import { Routes, Route } from "react-router-dom";

import { 
  Home,
  Dogs,
  OneDog,
  CreateDog,
  About,
  NotFound,

} from '../pages';


const MyRoutes = () => {

	return (
		<Routes>

			<Route path="/" element={<Home />} />
			<Route path="/dogs" element={<Dogs />} />
			<Route path="/dogs/:idDog" element={<OneDog />} />
			<Route path="/create" element={<CreateDog />} />
			<Route path="/about" element={<About />} />
			<Route path="*" element={<NotFound/>} />
		
		</Routes>
	)
}

export default MyRoutes;
