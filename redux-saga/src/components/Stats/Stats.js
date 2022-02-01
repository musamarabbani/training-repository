import React from 'react';
import './styles.css';

const Stats = ({ stats }) => {
	if (!stats) {
		return <span className='stats'>Loading ...</span>;
	}
	console.log('stats ==>', stats);
	return (
		<span className='stats'>
			{stats.error && 'Error!'}
			{stats.isLoading && 'Loading ...'}
			{stats.downloads !== null && `${stats.downloads}`}
		</span>
	);
};

export default Stats;
