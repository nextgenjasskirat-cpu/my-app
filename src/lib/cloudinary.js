import { v2 as cloudinary } from 'cloudinary';

// Validate Cloudinary environment variables
const validateCloudinaryConfig = () => {
  const requiredVars = {
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required Cloudinary environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env.local file and ensure all Cloudinary credentials are set.\n' +
      'Required variables: CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET'
    );
  }

  // Validate cloud name format (should not contain spaces or special characters)
  if (!/^[a-zA-Z0-9_-]+$/.test(process.env.CLOUDINARY_NAME)) {
    throw new Error(
      `Invalid CLOUDINARY_NAME format: "${process.env.CLOUDINARY_NAME}"\n` +
      'Cloud name should only contain letters, numbers, hyphens, and underscores.'
    );
  }
};

// Validate configuration before setting it up
try {
  validateCloudinaryConfig();
  
  // Configure Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} catch (error) {
  console.error('Cloudinary configuration error:', error.message);
  // Don't throw here to prevent app crashes, but log the error
}

export default cloudinary;