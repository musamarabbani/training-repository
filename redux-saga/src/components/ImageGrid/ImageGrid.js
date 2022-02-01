import React from 'react';
import { connect } from 'react-redux';
import { loadImages } from '../../actions';
import Button from '../Buttons';
import Stats from '../Stats';
import './styles.css';

class ImageGrid extends React.Component {
	state = {
		images: [],
	};
	componentDidMount() {
		this.props.loadImages();
	}

	render() {
		const { images, error, isLoading, loadImages, imageStats } = this.props;
		return (
			<div className='content'>
				<section className='grid'>
					{images &&
						images.map((image) => (
							<div
								key={image.id}
								className={`item item-${Math.ceil(image.height / image.width)}`}
							>
								<Stats stats={imageStats[image.id]} />
								<img src={image.urls.small} alt={image.user.username} />
							</div>
						))}
				</section>
				<Button onClick={() => !isLoading && loadImages()} loading={isLoading}>
					Load Images
				</Button>
				{error && <div className='error mt-3'>{JSON.stringify(error)}</div>}
			</div>
		);
	}
}

const mapStateToProps = ({ isLoading, images, error, imageStats }) => ({
	isLoading,
	images,
	error,
	imageStats,
});
const mapDispatchToProps = (dispatch) => ({
	loadImages: () => dispatch(loadImages()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ImageGrid);
