import React from 'react';
import { AppConsumer } from '../components/Context/index.js';

const hocConsummer = () => (Wrapp) =>{

	return(props) => {
		return(
			<AppConsumer>
				{
					(elm) =>{
						return(
							<Wrapp {...props} appContext={elm}/>
							);
					}
				}
			</AppConsumer>
		);

	};
};

export default hocConsummer ;