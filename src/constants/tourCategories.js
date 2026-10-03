import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import PublicIcon from '@mui/icons-material/Public';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ExploreIcon from '@mui/icons-material/Explore';

export const TOUR_CATEGORIES = {
  public: { label: 'Public Transportations', Icon: DirectionsBusIcon, color: '#C56BC9' },
  nature: { label: 'Nature & Adventure', Icon: PublicIcon, color: '#5FB3A9' },
  private: { label: 'Private Transportations', Icon: LocalTaxiIcon, color: '#E0B400' },
  business: { label: 'Business Tours', Icon: BusinessCenterIcon, color: '#E04B4B' },
  local: { label: 'Local Visit', Icon: ExploreIcon, color: '#3F86B8' },
};