import React from 'react';
import { connect } from 'react-redux';
import { loadImages } from '../../actions';
import './styles.css';

const key = 'vGqrVdkNaGth_IqRANV6MyeRxEORRF0n82IEOLsOvs4';

class ImageGrid extends React.Component {
	state = {
		images: [],
	};
	componentDidMount() {
		fetch(`https://api.unsplash.com/photos/?client_id=${key}`)
			.then((res) => {
				console.log('responses are ==>', res);
				this.setState({ images: res });
			})
			.catch((err) => {
				console.log('inside catch block ==>', err);
			});
	}
	render() {
		return (
			<div className='content'>
				<section className='grid'>
					{this.state.images &&
						this.state.images.map((image) => (
							<div
								key={image.id}
								className={`item item-${Math.ceil(image.height / image.width)}`}
							>
								<img src={image.urls.small} alt={image.user.username} />
							</div>
						))}
					<a onClick={this.props.onClick}>Load Images</a>
				</section>
			</div>
		);
	}
}

const mapStateToProps = ({ isLoading, images, error }) => ({
	isLoading,
	images,
	error,
});
const mapDispatchToProps = (dispatch) => ({
	loadImages: () => dispatch(loadImages()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ImageGrid);
