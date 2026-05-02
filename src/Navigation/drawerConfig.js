// Role-based drawer navigation configuration
// This centralizes navigation setup for different user roles

import FarmerTabs from './FarmerTabs';
import ExpertTabs from './ExpertTabs';
import MarketPrice from '../screens/MarketPrice';
import ChatScreen from '../screens/ChatScreen';
import Crops from '../screens/Crops';
import CommunityForum from '../screens/CommunityForum';

const DRAWER_CONFIG = {
  farmer: {
    screens: [
      {
        name: 'HomeTabs',
        component: FarmerTabs,
        label: 'Home',
      },
      {
        name: 'MarketPrice',
        component: MarketPrice,
        label: 'Market Price',
      },
      {
        name: 'Chat',
        component: ChatScreen,
        label: 'Chat',
      },
      {
        name: 'Crops',
        component: Crops,
        label: 'Crops',
      },
    ],
    drawerStyle: {
      backgroundColor: '#7ADAA5',
    },
  },
  expert: {
    screens: [
      {
        name: 'HomeTabs',
        component: ExpertTabs,
        label: 'Home',
      },
      {
        name: 'ExpertCommunity',
        component: CommunityForum,
        label: 'Community',
      },
      {
        name: 'ExpertChat',
        component: ChatScreen,
        label: 'Chat',
      },
    ],
    drawerStyle: {
      backgroundColor: '#7ADAA5',
    },
  },
};

export default DRAWER_CONFIG;
