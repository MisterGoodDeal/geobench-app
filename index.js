/**
 * Change the package : https://dev.to/karanpratapsingh/quick-guide-for-updating-package-name-in-react-native-3ei3
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
