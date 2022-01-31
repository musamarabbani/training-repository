import React from 'react';
import { connect } from 'react-redux';

function ImageGrid(props) {
	return <h2>ImageGrid Component</h2>;
}

const mapStateToProps = ({ isLoading, images, error }) => ({
	isLoading,
	images,
	error,
});
export default connect(mapStateToProps, null)(ImageGrid);
