import { Box } from '@mui/material';
import { morph, float, withMotion } from '../../../styles/animations';
import trendingImage from '../../../assets/images/Trending.jpg';

const BLOB_SHAPE = '60% 40% 55% 45% / 50% 60% 40% 50%';

const BlobImage = ({ src, alt }) => (
  <Box
    sx={{
      position: 'relative',
      flexShrink: 0,
      width: { xs: 260, sm: 340, md: 380 },
      height: { xs: 280, sm: 370, md: 410 },
      ...withMotion(`${float} 6s ease-in-out infinite`),
    }}
  >
    {/* البلوب الأصفر (خلف الصورة، يسار أسفل) */}
    <Box
      sx={{
        position: 'absolute',
        width: '62%',
        height: '62%',
        left: '-6%',
        bottom: '8%',
        bgcolor: '#FFEFB8',
        borderRadius: BLOB_SHAPE,
        ...withMotion(`${morph} 9s ease-in-out infinite reverse`),
      }}
    />

    {/* البلوب النعناعي (خلف الصورة، مزاح لليمين) */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        transform: 'translate(7%, -3%)',
        bgcolor: '#C9FBEF',
        borderRadius: BLOB_SHAPE,
        ...withMotion(`${morph} 11s ease-in-out infinite`),
      }}
    />

    {/* الصورة نفسها */}
    <Box
      component="img"
      src={trendingImage}
      alt={alt}
      sx={{
        position: 'absolute',
        top: '2%',
        left: '2%',
        width: '90%',
        height: '94%',
        objectFit: 'cover',
        borderRadius: BLOB_SHAPE,
        boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
        ...withMotion(`${morph} 8s ease-in-out infinite`),
      }}
    />
  </Box>
);

export default BlobImage;