import { Box } from './components/box/Box';
import { Params } from './components/params/Params';
import { BoxView } from './components/boxview/BoxView';
import './scss/index.scss'

const box = new Box('#app', {
  components: [Params, BoxView],
});

box.render();