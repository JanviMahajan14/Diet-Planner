import React, { Suspense }  from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './i18next'


ReactDOM.render(<Router><Suspense fallback={(<div>Loading</div>)}><App /> </Suspense></Router>, document.getElementById('root'));
registerServiceWorker();
