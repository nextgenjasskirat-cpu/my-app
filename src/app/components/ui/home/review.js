"use client";
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function ReviewComponent() {
  const [reviews, setReviews] = useState([]);
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmationType, setConfirmationType] = useState('success');
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState([0, 0, 0]);
  const videoRefs = [useRef(null), useRef(null), useRef(null)];
  
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 5
  });

  const reviewsPerPage = 6;
  
  // Video data - replace with your actual video files in public folder
  const videos = [
    { 
      src: '/videoMan.mp4', 
      title: 'Product Demo', 
      description: 'See how it works in action',
      duration: '2:30'
    },
    { 
      src: '/videoGirl2.mp4', 
      title: 'Customer Stories', 
      description: 'Real user experiences',
      duration: '1:45'
    },
    { 
      src: '/videoGirl1.mp4', 
      title: 'Features Overview', 
      description: 'All key features explained',
      duration: '3:15'
    }
  ];

  useEffect(() => {
    fetchReviews();
  }, []);

  // Ensure video elements are preloaded and ready on initial render
  useEffect(() => {
    const detachHandlers = [];

    videoRefs.forEach((ref) => {
      if (!ref.current) return;

      const videoEl = ref.current;
      try {
        videoEl.muted = true;
        // Capture first frame as poster when available
        const handleLoadedData = () => {
          if (!videoEl.videoWidth || !videoEl.videoHeight) return;
          const canvas = document.createElement('canvas');
          canvas.width = videoEl.videoWidth;
          canvas.height = videoEl.videoHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
          try {
            const dataUrl = canvas.toDataURL('image/jpeg');
            // Setting poster after data is loaded ensures we show the first frame
            videoEl.setAttribute('poster', dataUrl);
          } catch {}
        };

        videoEl.addEventListener('loadeddata', handleLoadedData, { once: true });
        detachHandlers.push(() => videoEl.removeEventListener('loadeddata', handleLoadedData));

        // Trigger the browser to fetch metadata/first frames
        videoEl.load();
      } catch {}
    });

    return () => {
      detachHandlers.forEach((fn) => fn());
    };
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      const endIndex = currentPage * reviewsPerPage;
      setDisplayedReviews(reviews.slice(0, endIndex));
    }
  }, [reviews, currentPage]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/review');
      const data = await response.json();
      const sortedReviews = data.reviews.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setReviews(sortedReviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      showConfirmationPopup('Failed to load reviews. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showConfirmationPopup = (message, type = 'success') => {
    setConfirmationMessage(message);
    setConfirmationType(type);
    setShowConfirmation(true);
    
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/review/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        await fetchReviews();
        setFormData({
          name: '',
          review: '',
          rating: 5
        });
        setShowForm(false);
        showConfirmationPopup('Review submitted successfully!');
      } else {
        console.error('Failed to submit review');
        showConfirmationPopup('Failed to submit review. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      showConfirmationPopup('Error submitting review. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleVideoPlay = (index) => {
    // Pause all other videos
    videoRefs.forEach((ref, i) => {
      if (ref.current && i !== index) {
        ref.current.pause();
      }
    });
    
    setActiveVideo(index);
    setIsPlaying(true);
  };

  const handleVideoPause = (index) => {
    if (activeVideo === index) {
      setIsPlaying(false);
    }
  };

  const handleVideoEnd = (index) => {
    if (activeVideo === index) {
      setIsPlaying(false);
    }
  };

  const handleVideoTimeUpdate = (index, e) => {
    const video = e.target;
    const progress = (video.currentTime / video.duration) * 100;
    const newProgress = [...videoProgress];
    newProgress[index] = progress;
    setVideoProgress(newProgress);
  };

  const togglePlayPause = (index) => {
    const video = videoRefs[index].current;
    if (!video) return;

    if (video.paused) {
      video.play();
      handleVideoPlay(index);
    } else {
      video.pause();
      handleVideoPause(index);
    }
  };

  const hasMoreReviews = displayedReviews.length < reviews.length;

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? 'text-yellow-400' : 'text-gray-600'} 
              transition-all duration-300 ${star <= rating ? 'scale-110' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm font-medium text-gray-400">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const RatingInput = ({ value, onChange }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none transition-transform hover:scale-110"
            aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
          >
            <svg
              className={`w-8 h-8 cursor-pointer transition-all duration-300 ${star <= value ? 'text-yellow-400 transform scale-110' : 'text-gray-600'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        <span className="ml-2 text-sm font-medium text-gray-400">{value}.0</span>
      </div>
    );
  };

  const ConfirmationPopup = () => {
    if (!showConfirmation) return null;
    
    return (
      <div className="fixed top-4 right-4 z-50 animate-fade-in-up">
        <div className={`rounded-lg p-4 shadow-lg border-l-4 ${confirmationType === 'success' 
          ? 'bg-black border-yellow-500 text-gray-200' 
          : 'bg-black border-red-500 text-gray-200'}`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {confirmationType === 'success' ? (
                <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{confirmationMessage}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    confirmationType === 'success' 
                      ? 'bg-black text-gray-200 hover:bg-gray-900 focus:ring-yellow-500' 
                      : 'bg-black text-gray-200 hover:bg-gray-900 focus:ring-red-500'
                  }`}
                  aria-label="Close notification"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Do not block initial UI; show a small banner instead of replacing the whole page

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <Head>
        <title>Customer Reviews & Demos</title>
        <meta name="description" content="Share your experience and watch our product demos" />
      </Head>

      <ConfirmationPopup />

      {isLoading && (
        <div className="mb-6 flex items-center justify-center">
          <div className="flex items-center space-x-3 text-gray-400">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-yellow-500"></div>
            <span>Loading reviews…</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Video Section - All Videos Side by Side */}
        <div className="mb-16 animate-fade-in-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
              Student Reviews
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              See what our students are saying about their experience with us
            </p>
          </div>

          {/* Three Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {videos.map((video, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-800 hover:border-yellow-500/50 transition-all duration-500 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Video Container - Portrait Mode */}
                <div className="relative bg-black">
                  <div className="relative pt-[177.78%]"> {/* 9:16 aspect ratio for portrait */}
                    <video
                      ref={videoRefs[index]}
                      className="absolute inset-0 w-full h-full object-cover"
                      onPlay={() => handleVideoPlay(index)}
                      onPause={() => handleVideoPause(index)}
                      onEnded={() => handleVideoEnd(index)}
                      onTimeUpdate={(e) => handleVideoTimeUpdate(index, e)}
                      playsInline
                      muted
                      preload="auto"
                      crossOrigin="anonymous"
                    >
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Custom Play/Pause Button Overlay */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                      onClick={() => togglePlayPause(index)}
                    >
                      <div className={`transform transition-all duration-300 ${
                        isPlaying && activeVideo === index ? 'scale-110 opacity-100' : 'scale-90 opacity-90 group-hover:scale-100'
                      }`}>
                        {isPlaying && activeVideo === index ? (
                          <div className="bg-black/70 rounded-full p-4">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M6 4h4v16H6zM14 4h4v16h-4z"/>
                            </svg>
                          </div>
                        ) : (
                          <div className="bg-yellow-500/90 hover:bg-yellow-400 rounded-full p-4 transform group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    

                    {/* Loading Spinner */}
                    {isPlaying && activeVideo === index && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                    <div 
                      className="h-full bg-yellow-500 transition-all duration-300"
                      style={{ width: `${videoProgress[index]}%` }}
                    ></div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Video Instructions */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              Click on any video to play. Other videos will automatically pause.
            </p>
          </div>
        </div>

        {/* Rest of the reviews component remains the same */}
        <div className="text-center mb-12 border-b border-gray-800 pb-8">
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gray-900 text-gray-100 hover:text-yellow-400 font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center mx-auto border-2 border-yellow-600 hover:border-yellow-500 group"
          >
            {showForm ? (
              <>
                <svg className="w-5 h-5 mr-2 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel Review
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Your Review
              </>
            )}
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-900 rounded-xl p-6 md:p-8 mb-12 animate-fade-in-up border-2 border-yellow-600 shadow-lg relative overflow-visible z-10">
            {/* Decorative elements */}
            <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-yellow-500 animate-pulse"></div>
            <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-yellow-500 animate-pulse"></div>
            <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-yellow-500 animate-pulse"></div>
            <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-yellow-500 animate-pulse"></div>
            
            <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
              Share Your Experience
            </h2>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-800 text-gray-100 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 placeholder-gray-500"
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Rating</label>
                <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <RatingInput 
                    value={formData.rating} 
                    onChange={(rating) => setFormData({...formData, rating})} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Your Review</label>
                <textarea
                  value={formData.review}
                  onChange={(e) => setFormData({...formData, review: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-800 text-gray-100 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 placeholder-gray-500"
                  required
                  placeholder="Share your experience with our product/service..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-600 text-gray-900 hover:bg-yellow-500 font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center border-2 border-yellow-500 group"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Review
                    <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ... rest of the reviews section remains unchanged ... */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-100">
            Customer Feedback <span className="text-yellow-400">({reviews.length})</span>
          </h2>
          {reviews.length > 0 && (
            <div className="text-sm text-gray-400">
              Showing {displayedReviews.length} of {reviews.length} reviews
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedReviews.map((review, index) => (
            <div 
              key={review._id} 
              className="bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up flex flex-col border border-gray-800 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100 group-hover:text-yellow-400 transition-colors">
                      {review.name}
                    </h3>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                
                <p className="text-gray-400 mb-6 line-clamp-4 group-hover:text-gray-300 transition-colors">
                  {review.review}
                </p>
              </div>
              
              <div className="px-6 py-4 bg-gray-800 border-t border-gray-700">
                <div className="text-sm text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMoreReviews && (
          <div className="text-center border-t border-gray-800 pt-8">
            <button
              onClick={handleLoadMore}
              className="bg-gray-900 text-gray-100 border-2 border-yellow-600 hover:text-yellow-400 font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center mx-auto hover:border-yellow-500 group"
            >
              Load More Reviews
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {!hasMoreReviews && reviews.length > 0 && (
          <div className="text-center py-6 border-t border-gray-800">
            <p className="text-gray-400 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              You've reached the end of all reviews.
            </p>
          </div>
        )}

        {reviews.length === 0 && (
          <div className="text-center py-16 bg-gray-900 rounded-xl shadow-md border border-gray-800">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <p className="text-gray-300 text-lg mb-4">No reviews yet. Be the first to share your experience!</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gray-900 text-gray-100 hover:text-yellow-400 font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-2 border-yellow-600 hover:border-yellow-500"
            >
              Write a Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}