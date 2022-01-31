import React from 'react';
import Header from './components/Header';
import ImageGrid from './components/ImageGrid';
import { Provider } from 'react-redux';
import configureStore from './store';
import './App.css';

const store = configureStore();

function App() {
	return (
		<Provider store={store}>
			<React.Fragment>
				<Header />
				<ImageGrid />
			</React.Fragment>
		</Provider>
	);
}

export default App;
