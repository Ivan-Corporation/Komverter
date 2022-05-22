import React from 'react';
import PropTypes from 'prop-types';
import styles from './VideoContent.module.scss';
import VideoPlayer from '../VideoPlayer';
import VideoInfo from '../VideoInfo';
import VideoDescription from '../VideoDescription';
import VideoList from '../VideoList';
import Button from '../Button';
import { motion } from 'framer-motion/dist/framer-motion'



const VideoContent = ({
  videoId,
  autoPlay,
  videoTitle,
  channelTitle,
  publishedAt,
  viewCount,
  likeCount,
  commentCount,
  description,
  relatedVideos,
  onDownload,
  isDownloadDisabled,
}) => {
  return (
    <section className={styles.videoContent}>
      <main className={styles.mainContent}>
      <motion.div
                initial={{ opacity: 0, x: -280 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    ease: "easeInOut",
                    duration: 1.3,
                    delay: 0.3,
                }}
                >
        <VideoPlayer
          videoId={videoId}
          videoTitle={videoTitle}
          autoPlay={autoPlay}
          className={styles.marginBottom}
        />
        </motion.div>
        <motion.div
                initial={{ opacity: 0, x: -280 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    ease: "easeInOut",
                    duration: 1.1,
                    delay: 0.6,
                }}
                >
        <Button
          type="button"
          onClick={onDownload}
          icon="download"
          color={isDownloadDisabled ? 'secondary' : 'primary'}
          disabled={isDownloadDisabled}
          className={styles.marginBottom}
        >
          Download Mp3
        </Button> 
        </motion.div>
        <motion.div
                initial={{ opacity: 0, x: -280 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    ease: "easeInOut",
                    duration: 1.1,
                    delay: 0.7,
                }}
                >
        <VideoInfo
          videoTitle={videoTitle}
          channelTitle={channelTitle}
          publishedAt={publishedAt}
          viewCount={viewCount}
          likeCount={likeCount}
          
          commentCount={commentCount}
          className={description ? styles.marginBottom : ''}
        />
        {description && (
          <VideoDescription description={description} className={styles.marginBottom} />
        )}
        </motion.div>
      </main>
      
      <aside className={styles.relatedVideos}>
      <motion.div
                initial={{ opacity: 0, x: 280 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    ease: "easeInOut",
                    duration: 1.1,
                    delay: 0.7,
                }}
                >
        {relatedVideos && relatedVideos.length && (
          <VideoList
            videos={relatedVideos}
            title="Related Videos: 🔥"
            showDescription={false}
            showViews={true}
          />
        )}
         </motion.div>
      </aside>
     
    </section>
  );
};

VideoContent.propTypes = {
  videoId: PropTypes.string.isRequired,
  autoPlay: PropTypes.bool,
  videoTitle: PropTypes.string.isRequired,
  channelTitle: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  viewCount: PropTypes.string.isRequired,
  likeCount: PropTypes.string.isRequired,
  dislikeCount: PropTypes.string.isRequired,
  commentCount: PropTypes.string.isRequired,
  description: PropTypes.string,
  relatedVideos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      description: PropTypes.string,
      channelTitle: PropTypes.string.isRequired,
      publishedAt: PropTypes.string.isRequired,
      views: PropTypes.string,
    })
  ),
  onDownload: PropTypes.func.isRequired,
  isDownloadDisabled: PropTypes.bool.isRequired,
};

VideoContent.defaultProps = {
  autoPlay: false,
  description: null,
  relatedVideos: null,
};

export default VideoContent;
