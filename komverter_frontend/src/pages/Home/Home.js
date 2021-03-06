import React, {useState} from 'react';
import usePromise from 'react-fetch-hook/usePromise';
import VideoGrid from '../../components/VideoGrid';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import axiosInstance from '../../apis/youTube/axiosInstance';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Container from '@mui/material/Container'
import { motion } from 'framer-motion/dist/framer-motion'
import usa from '../../images/united-states.png'
import france from '../../images/france.png'
import russia from '../../images/russia.png'
import germany from '../../images/germany.png'
import uk from '../../images/uk.png'
import ukraine from '../../images/ukraine.png'
import italy from '../../images/italy.png'
import spain from '../../images/spain.png'




const Home = () => {
  const saved = localStorage.getItem("regionCode");

  const initialValue = JSON.parse(saved) || 'US';

  const [regionCode, setRegionCode] = useState(initialValue || 'US')


  

  localStorage.setItem("regionCode", JSON.stringify(regionCode));
  

  const handleChange = (event) => {
    setRegionCode(event.target.value);
    window.location.reload(true);
  };

  const controlProps = (item) => ({
    checked: regionCode === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
    
  });



  function getPopularVideos (videoCategoryId = 10, pageToken = '', maxResults = 20) {


    return axiosInstance.get(
      `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=${regionCode}&videoCategoryId=${videoCategoryId}&maxResults=${maxResults}&pageToken=${pageToken}`
    );
  };

  const { isLoading, data = { items: null }, error = {} } = usePromise(() => getPopularVideos(10), [
    10,
  ]);

  if (error.message || (data.items && data.items.length === 0)) {
    const message =
      error.message === 'Network Error'
        ? 'Network Error. Please refresh the page and try again'
        : 'No popular videos found.';
    return (
      <ErrorMessage position="center">
        <p>{message}</p>
      </ErrorMessage>
    );
  }

  if (isLoading) return <Loader position="center" />;


  


  return (
    <main>
       <motion.div
                initial={{ opacity: 0, x: -180 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    ease: "easeInOut",
                    duration: 1.5,
                    delay: 2,
                }}
                >
      <Container align='center'>
      <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Choose your region: ???????</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
                <Radio {...controlProps('US')} /> 
                <img src={usa} style={{width:'40px'}}/>
                <Radio {...controlProps('GB')} />
                <img src={uk} style={{width:'40px'}}/>
                <Radio {...controlProps('RU')}  />
                <img src={russia} style={{width:'40px'}}/>
                <Radio {...controlProps('DE')}  />
                <img src={germany} style={{width:'40px'}}/>
                <Radio {...controlProps('UA')}  />
                <img src={ukraine} style={{width:'40px'}}/>
                <Radio {...controlProps('FR')}  />
                <img src={france} style={{width:'40px'}}/>
                <Radio {...controlProps('IT')}  />
                <img src={italy} style={{width:'40px'}}/>
                <Radio {...controlProps('ES')}  />
                <img src={spain} style={{width:'40px'}}/>
      </RadioGroup>
    </FormControl>
    </Container>
    </motion.div>
    <motion.div
                initial={{ opacity: 0, x: 180 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    ease: "easeInOut",
                    duration: 1.5,
                    delay: 2.5,
                }}
                >
      <VideoGrid
        title="Most popular charts for month:"
        videos={data.items}
        showViews
        showDescription={false}
      />
      </motion.div>
    </main>
  );
};

export default Home;
