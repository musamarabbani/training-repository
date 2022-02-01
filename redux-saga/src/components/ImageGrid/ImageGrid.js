import React from 'react';
import { connect } from 'react-redux';
import { loadImages } from '../../actions';
import './styles.css';

class ImageGrid extends React.Component {
	state = {
		images: [],
	};

	render() {
		const { images } = this.props;
		return (
			<div className='content'>
				<section className='grid'>
					{images &&
						images.map((image) => (
							<div
								key={image.id}
								className={`item item-${Math.ceil(image.height / image.width)}`}
							>
								<img src={image.urls.small} alt={image.user.username} />
							</div>
						))}
					<button className='btn btn-primary' onClick={this.props.loadImages}>
						Load Images
					</button>
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
