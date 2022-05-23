import React, { useState, useRef, useEffect } from 'react';
import { saveAs } from 'file-saver';
import { useParams } from 'react-router-dom';
import usePromise from 'react-fetch-hook/usePromise';
import { toast } from 'react-toastify';
import { getRelatedVideos, getVideoDetails } from '../../apis/youTube/youTube';
import downloadMp3 from '../../apis/backend/backend';
import VideoContent from '../../components/VideoContent';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Button from '@mui/material/Button';
import loader from '../../images/cat.gif'
import { Container } from '@mui/system';
import DownloadIcon from '@mui/icons-material/Download';
import LinearProgress from '@mui/material/LinearProgress';
import  Typography from '@mui/material/Typography';




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const Download = () => {

  const [open, setOpen] = React.useState(false);

const handleClose = () => {
  setOpen(false);
};


  const { videoId } = useParams();

  const {
    isLoading: videoDetailsLoading,
    data: videoDetails = { items: null },
    error: videoDetailsError = {},
  } = usePromise(() => getVideoDetails(videoId), [videoId]);

  const { data: relatedVideos = { items: null }, error: relatedVideosError = {} } = usePromise(
    () => getRelatedVideos(videoId),
    [videoId]
  );

  const [isDownloadDisabled, setIsDownloadDisabled] = useState(false);

  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  });

  const handleDownload = async () => {
    setIsDownloadDisabled(true);
    const toastId = toast.info(`Downloading ${videoDetails.items[0].title}`);
    setOpen(true);
    try {
      const { data, headers } = await downloadMp3(videoId);
      const filename = headers['content-disposition'].split('=')[1].replace(/"/gi, '').trim();
      saveAs(data, filename);

      toast.update(toastId, {
        render: `Download complete: ${videoDetails.items[0].title}`,
        type: toast.TYPE.SUCCESS,
        autoClose: 2000,
        hideProgressBar: false,
      });
    } catch (error) {
      toast.update(toastId, {
        render: `Downloading failed: ${videoDetails.items[0].title}`,
        type: toast.TYPE.ERROR,
        autoClose: 2000,
        hideProgressBar: false,
      });
    } finally {
      if (isMounted.current) setIsDownloadDisabled(false);
    }
  };

  useEffect(() => {
    setIsDownloadDisabled(false);
  }, [videoId]);

  if (videoDetailsError.message) {
    const message =
      videoDetailsError.message === 'Network Error'
        ? 'Network Error. Please refresh the page and try again.'
        : 'Something went wrong. Please try again.';
    return (
      <ErrorMessage position="center">
        <p>{message}</p>
      </ErrorMessage>
    );
  }

  if (videoDetailsLoading && !videoDetails.items) return <Loader position="center" />;

  if (videoDetails && videoDetails.items.length === 0) {
    return (
      <ErrorMessage position="center">
        <p>Video not found.</p>
      </ErrorMessage>
    );
  }

  const {
    id,
    title,
    channelTitle,
    channelId,
    publishedAt,
    tags,
    viewCount,
    likeCount,
    dislikeCount,
    commentCount,
    description,
  } = videoDetails.items[0];

  return (
    <React.Fragment>
    <VideoContent
      videoId={id}
      autoPlay
      videoTitle={title}
      channelTitle={channelTitle}
      channelId={channelId}
      publishedAt={publishedAt}
      tags={tags}
      viewCount={viewCount}
      likeCount={likeCount}
      dislikeCount={dislikeCount}
      commentCount={commentCount}
      description={description}
      relatedVideos={
        videoDetails.items &&
        videoDetails.items.length &&
        relatedVideos.items &&
        relatedVideos.items.length &&
        !relatedVideosError.message
          ? relatedVideos.items
          : null
      }
      onDownload={handleDownload}
      isDownloadDisabled={isDownloadDisabled}
    />
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Video is converting... Just wait a minute..."}</DialogTitle>
        <DialogContent> <LinearProgress />
        <Container align='center'>
        
          <img src={loader} style={{marginTop:'20px', marginBottom:'20px'}}/>

         

          </Container>
        </DialogContent>
        <DialogActions>
        <Container align='center'>
          <Button color="success" onClick={handleClose} variant="contained" endIcon={<DownloadIcon />}>Understandable</Button>
          
          <Typography variant='subtitle1' style={{marginTop:'20px', marginBottom:'20px'}}><u><a href='https://github.com/Ivan-Corporation/Komverter/releases/tag/v1.0.0'>If downloading always fail (Youtube API), try desktop version (mp4 support)</a></u></Typography>
          </Container>
        </DialogActions>
      </Dialog>
      </React.Fragment>
  );
};

export default Download;
