import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Ensure Node.js runtime for upload streams
export const runtime = 'nodejs';

// Validate and configure Cloudinary
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
      'Please check your .env.local file and ensure all Cloudinary credentials are set.'
    );
  }

  // Validate cloud name format
  if (!/^[a-zA-Z0-9_-]+$/.test(process.env.CLOUDINARY_NAME)) {
    throw new Error(
      `Invalid CLOUDINARY_NAME format: "${process.env.CLOUDINARY_NAME}"\n` +
      'Cloud name should only contain letters, numbers, hyphens, and underscores.'
    );
  }
};

// Configure Cloudinary with validation
try {
  validateCloudinaryConfig();
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} catch (error) {
  console.error('Cloudinary configuration error:', error.message);
}

// Handle POST request to upload photo via formData and upload_stream
export async function POST(request) {
  try {
    // Check if Cloudinary is properly configured
    if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json({ 
        error: 'Cloudinary configuration missing. Please check your environment variables.',
        details: 'CLOUDINARY_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET must be set in .env.local'
      }, { status: 500 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: 'gallery',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          return resolve(result);
        }
      );

      upload.end(buffer);
    });

    return NextResponse.json({
      message: 'Photo uploaded successfully',
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error('Upload error:', error);
    
    // Provide more specific error messages
    if (error.message.includes('Invalid cloud_name')) {
      return NextResponse.json({ 
        error: 'Invalid Cloudinary cloud name. Please check your CLOUDINARY_NAME environment variable.',
        details: error.message
      }, { status: 401 });
    }
    
    if (error.message.includes('Invalid API key')) {
      return NextResponse.json({ 
        error: 'Invalid Cloudinary API key. Please check your CLOUDINARY_API_KEY environment variable.',
        details: error.message
      }, { status: 401 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to upload photo',
      details: error.message
    }, { status: 500 });
  }
}

// Handle DELETE request to remove photo
export async function DELETE(request) {
  try {
    // Check if Cloudinary is properly configured
    if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json({ 
        error: 'Cloudinary configuration missing. Please check your environment variables.',
        details: 'CLOUDINARY_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET must be set in .env.local'
      }, { status: 500 });
    }

    const { public_id } = await request.json();
    if (!public_id) {
      return NextResponse.json({ error: 'Public ID is required' }, { status: 400 });
    }

    // Delete photo from Cloudinary
    await cloudinary.uploader.destroy(public_id, { resource_type: 'image' });

    return NextResponse.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    
    // Provide more specific error messages
    if (error.message.includes('Invalid cloud_name')) {
      return NextResponse.json({ 
        error: 'Invalid Cloudinary cloud name. Please check your CLOUDINARY_NAME environment variable.',
        details: error.message
      }, { status: 401 });
    }
    
    if (error.message.includes('Invalid API key')) {
      return NextResponse.json({ 
        error: 'Invalid Cloudinary API key. Please check your CLOUDINARY_API_KEY environment variable.',
        details: error.message
      }, { status: 401 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to delete photo',
      details: error.message
    }, { status: 500 });
  }
}