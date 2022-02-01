import React from 'react';
import { connect } from 'react-redux';
import { loadImages } from '../../actions';
import Button from '../Buttons';
import './styles.css';

class ImageGrid extends React.Component {
	state = {
		images: [],
	};
	componentDidMount() {
		this.props.loadImages();
	}

	render() {
		const { images, error, isLoading, loadImages } = this.props;
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
				</section>
				<Button onClick={() => !isLoading && loadImages()} loading={isLoading}>
					Load Images
				</Button>
				{error && <div className='error mt-3'>{JSON.stringify(error)}</div>}
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
