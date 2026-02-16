"""
Favicon Generator Script
Converts profile.jpg to all required favicon formats
"""

from PIL import Image
import os

def create_favicon_files():
    """Generate all favicon files from profile.jpg"""
    
    # Get the public directory path
    script_dir = os.path.dirname(os.path.abspath(__file__))
    public_dir = os.path.join(script_dir, 'public')
    
    # Input image path
    input_image = os.path.join(public_dir, 'profile.jpg')
    
    if not os.path.exists(input_image):
        print(f"Error: {input_image} not found!")
        return
    
    # Open and process the image
    print(f"Opening {input_image}...")
    img = Image.open(input_image)
    
    # Convert to RGB if necessary (for .ico format)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Define favicon sizes and filenames
    favicon_sizes = [
        (16, 16, 'favicon-16x16.png'),
        (32, 32, 'favicon-32x32.png'),
        (180, 180, 'apple-touch-icon.png'),
        (192, 192, 'android-chrome-192x192.png'),
        (512, 512, 'android-chrome-512x512.png'),
    ]
    
    # Generate each favicon size
    for width, height, filename in favicon_sizes:
        output_path = os.path.join(public_dir, filename)
        resized_img = img.resize((width, height), Image.Resampling.LANCZOS)
        resized_img.save(output_path, 'PNG', optimize=True)
        print(f"✓ Created {filename} ({width}x{height})")
    
    # Create favicon.ico (multi-size .ico file)
    ico_path = os.path.join(public_dir, 'favicon.ico')
    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_images = [img.resize(size, Image.Resampling.LANCZOS) for size in ico_sizes]
    ico_images[0].save(ico_path, format='ICO', sizes=ico_sizes)
    print(f"✓ Created favicon.ico (multi-size)")
    
    print("\n✅ All favicon files created successfully!")
    print(f"\nFiles created in: {public_dir}")
    print("\nNext steps:")
    print("1. Clear your browser cache")
    print("2. Restart your dev server: npm run dev")
    print("3. Check your browser tab for the new favicon!")

if __name__ == "__main__":
    try:
        create_favicon_files()
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\nMake sure you have Pillow installed:")
        print("  pip install Pillow")
