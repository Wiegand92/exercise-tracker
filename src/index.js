// 3rd Party //
import React from 'react';
import reactDOM from 'react-dom';

// Styles //
// Import tailwind first to give our styles preference //
import 'tailwindcss/tailwind.css';
import './styles/style.scss';

// Components //
import App from './components/App';

// Render //
reactDOM.render(<App />, document.getElementById('app'));
