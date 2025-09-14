'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiX, FiTrash2, FiImage, FiLoader, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function CloudinaryUploader() {
  const [photos, setPhotos] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [configError, setConfigError] = useState(null);

  // Fetch existing photos on component mount
  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await fetch('/api/gallery/getAllPhoto');
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${res.status}: Failed to fetch photos`);
      }
      const data = await res.json();
      
      // Use data.photos instead of data.images
      const formattedPhotos = (data.photos || []).map(image => ({
        public_id: image.public_id,
        url: image.url,
      }));
      
      setPhotos(formattedPhotos);
    } catch (error) {
      console.error('Error fetching photos:', error);
      if (error.message.includes('Invalid cloud_name') || error.message.includes('configuration')) {
        setConfigError(`Cloudinary configuration error: ${error.message}. Please check your .env.local file and ensure CLOUDINARY_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set correctly.`);
      } else {
        setError(`Failed to load photos: ${error.message}`);
      }
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    
    setIsUploading(true);
    setProgress(0);
    setError(null);
    setSuccess(null);

    const uploadedPhotos = [];
    const errors = [];
    
    for (const [index, file] of acceptedFiles.entries()) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/admin/gallery/editGallery', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const errorMessage = errorData.error || errorData.details || `HTTP ${response.status}: Upload failed`;
          throw new Error(errorMessage);
        }

        const data = await response.json();
        uploadedPhotos.push({
          public_id: data.public_id || data.publicId,
          url: data.url,
        });
        
        // Calculate progress with a slight delay for smoother animation
        setTimeout(() => {
          setProgress(Math.round((index + 1) / acceptedFiles.length * 100));
        }, 100);
      } catch (error) {
        console.error('Upload error:', error);
        if (error.message.includes('Invalid cloud_name') || error.message.includes('configuration')) {
          setConfigError(`Cloudinary configuration error: ${error.message}. Please check your .env.local file.`);
        }
        errors.push(`${file.name}: ${error.message}`);
      }
    }

    if (uploadedPhotos.length > 0) {
      setPhotos(prev => [...uploadedPhotos, ...prev]);
      setSuccess(`Successfully uploaded ${uploadedPhotos.length} file(s)`);
      if (errors.length > 0) {
        setError(`Failed to upload ${errors.length} file(s): ${errors.join(', ')}`);
      }
    } else if (errors.length > 0) {
      setError('Failed to upload all files. Please try again.');
    }

    setIsUploading(false);
    setProgress(0);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop
  });

  const handleDelete = async (publicId) => {
    if (!publicId) return;
    
    try {
      setIsDeleting(true);
      setError(null);
      const response = await fetch('/api/admin/gallery/editGallery', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_id: publicId }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.details || `HTTP ${response.status}: Delete failed`;
        throw new Error(errorMessage);
      }
      
      setPhotos(prev => prev.filter(photo => photo.public_id !== publicId));
      setSuccess('Photo deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      if (error.message.includes('Invalid cloud_name') || error.message.includes('configuration')) {
        setConfigError(`Cloudinary configuration error: ${error.message}. Please check your .env.local file.`);
      } else {
        setError(`Failed to delete photo: ${error.message}`);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Clear config error after 10 seconds
  useEffect(() => {
    if (configError) {
      const timer = setTimeout(() => {
        setConfigError(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [configError]);

  return (
    <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl">
      <div className="max-w-7xl mx-auto">
        {/* Status Messages */}
        <AnimatePresence>
          {configError && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-4 bg-orange-50 border-l-4 border-orange-500 text-orange-700 rounded flex items-start gap-3"
            >
              <FiAlertCircle className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Configuration Error</p>
                <p className="text-sm mt-1">{configError}</p>
              </div>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded flex items-start gap-3"
            >
              <FiAlertCircle className="mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded flex items-start gap-3"
            >
              <FiCheckCircle className="mt-0.5 flex-shrink-0" />
              <p>{success}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Zone */}
        <motion.div 
          {...getRootProps()}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
            isDragActive 
              ? 'border-red-500 bg-red-100 shadow-lg' 
              : 'border-red-300 hover:border-red-400 hover:bg-red-100/50 hover:shadow-md'
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <motion.div
              animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <FiUpload className={`mx-auto h-10 w-10 ${
                isDragActive ? 'text-red-500' : 'text-red-400'
              }`} />
            </motion.div>
            <div className="flex flex-col sm:flex-row justify-center items-center text-sm text-red-600 gap-1">
              <span className="font-medium text-red-600 hover:text-red-500 cursor-pointer">
                Upload files
              </span>
              <p className="text-red-600">or drag and drop</p>
            </div>
            <p className="text-xs text-red-500">
              PNG, JPG, WEBP up to 10MB (max 10 files)
            </p>
          </div>
        </motion.div>

        {/* Progress Bar */}
        {isUploading && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-red-600">
                Uploading...
              </span>
              <span className="text-sm font-medium text-red-600">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-red-200 rounded-full h-2.5 overflow-hidden">
              <motion.div
                className="bg-red-500 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        )}

        {/* Photo Gallery */}
        {photos.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {photos.map((photo, index) => (
                <motion.div 
                  key={photo.public_id || index}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white border border-red-200"
                >
                  <img
                    src={photo.url}
                    alt={`Uploaded content ${index}`}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <button
                      onClick={() => handleDelete(photo.public_id)}
                      disabled={isDeleting}
                      className="ml-auto bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 flex items-center shadow-md"
                    >
                      {isDeleting ? (
                        <>
                          <FiLoader className="animate-spin mr-2 h-4 w-4" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <FiTrash2 className="mr-1 h-4 w-4" />
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-12 bg-white rounded-xl shadow-sm border border-red-200 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FiImage className="mx-auto h-12 w-12 text-red-400 mb-4" />
            <h3 className="text-lg font-medium text-red-800">
              No photos uploaded yet
            </h3>
            <p className="mt-1 text-sm text-red-600">
              Get started by uploading some images
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}