# LoveLang Image Integration Guide

This guide shows you how to use the authentic LoveLang product images throughout your e-commerce platform.

## 📁 File Structure

- `client/src/data/image-urls.ts` - Centralized image URL management
- `client/src/components/examples/image-gallery.tsx` - Usage examples
- Updated components using real LoveLang images

## 🖼️ Image Categories Available

### 1. Banner Images
```typescript
LOVELANG_IMAGES.banners.shopAllBanner
```
Perfect for hero sections, landing page banners, and promotional areas.

### 2. Product Collections
```typescript
LOVELANG_IMAGES.collections.avocado    // Avocado collection thumbnail
LOVELANG_IMAGES.collections.mango      // Mango collection thumbnail
LOVELANG_IMAGES.collections.untitledDesign // Additional collection image
```
Use these for category navigation, collection previews, and product grouping.

### 3. Product Images by Type

#### Mango Collection (Frizzy Hair)
```typescript
LOVELANG_IMAGES.products.mango.primary[0]  // Main product image 1
LOVELANG_IMAGES.products.mango.primary[1]  // Main product image 2
LOVELANG_IMAGES.products.mango.masks[0]    // Mango mask 1
LOVELANG_IMAGES.products.mango.masks[1]    // Mango mask 2
LOVELANG_IMAGES.products.mango.shampoo[0]  // Mango shampoo 1
LOVELANG_IMAGES.products.mango.shampoo[1]  // Mango shampoo 2
LOVELANG_IMAGES.products.mango.icon        // Collection icon
```

#### Peach Collection (Hair Fall)
```typescript
LOVELANG_IMAGES.products.peach.primary[0]  // Main product image 1
LOVELANG_IMAGES.products.peach.primary[1]  // Main product image 2
LOVELANG_IMAGES.products.peach.masks[0]    // Peach mask images (3 available)
LOVELANG_IMAGES.products.peach.shampoo[0]  // Peach shampoo
LOVELANG_IMAGES.products.peach.icon        // Collection icon
```

#### Avocado Collection (Damaged Hair)
```typescript
LOVELANG_IMAGES.products.avocado.primary[0]  // Main product image 1
LOVELANG_IMAGES.products.avocado.primary[1]  // Main product image 2
LOVELANG_IMAGES.products.avocado.masks[0]    // Avocado mask 1
LOVELANG_IMAGES.products.avocado.masks[1]    // Avocado mask 2
LOVELANG_IMAGES.products.avocado.shampoo[0]  // Avocado shampoo 1
LOVELANG_IMAGES.products.avocado.shampoo[1]  // Avocado shampoo 2
LOVELANG_IMAGES.products.avocado.icon        // Collection icon
```

### 4. Brand Quality Badges
```typescript
LOVELANG_IMAGES.badges.fdcaApproved    // FDCA certification
LOVELANG_IMAGES.badges.vitaminInfused  // Vitamin enriched
LOVELANG_IMAGES.badges.vegan           // Vegan formula
LOVELANG_IMAGES.badges.crueltyFree     // Cruelty-free certification
```

### 5. Customer Testimonial Photos
```typescript
LOVELANG_IMAGES.testimonials[0]  // Customer photo 1
LOVELANG_IMAGES.testimonials[1]  // Customer photo 2
LOVELANG_IMAGES.testimonials[2]  // Customer photo 3
```

## 🎯 Usage Examples

### Basic Image Usage
```jsx
import { LOVELANG_IMAGES } from '@/data/image-urls';

// Hero section
<img src={LOVELANG_IMAGES.banners.shopAllBanner} alt="Shop All Products" />

// Product categories
<img src={LOVELANG_IMAGES.collections.avocado} alt="Avocado Collection" />

// Product details
<img src={LOVELANG_IMAGES.products.mango.primary[0]} alt="Mango Hair Product" />
```

### Responsive Images
```jsx
import { getOptimizedImageUrl } from '@/data/image-urls';

// Mobile (400px)
<img src={getOptimizedImageUrl(LOVELANG_IMAGES.products.avocado.primary[0], 400)} />

// Tablet (800px)
<img src={getOptimizedImageUrl(LOVELANG_IMAGES.products.avocado.primary[0], 800)} />

// Desktop (1200px)
<img src={getOptimizedImageUrl(LOVELANG_IMAGES.products.avocado.primary[0], 1200)} />
```

### Product Gallery
```jsx
// Create image galleries for product pages
const productImages = [
  ...LOVELANG_IMAGES.products.mango.primary,
  ...LOVELANG_IMAGES.products.mango.masks,
  ...LOVELANG_IMAGES.products.mango.shampoo
];

productImages.map((img, index) => (
  <img key={index} src={img} alt={`Product ${index + 1}`} />
))
```

### Brand Badges Section
```jsx
const badges = [
  { name: "FDCA Approved", image: LOVELANG_IMAGES.badges.fdcaApproved },
  { name: "Vitamin Infused", image: LOVELANG_IMAGES.badges.vitaminInfused },
  { name: "Vegan", image: LOVELANG_IMAGES.badges.vegan },
  { name: "Cruelty Free", image: LOVELANG_IMAGES.badges.crueltyFree }
];
```

## 🔧 Components Updated

The following components have been updated to use authentic LoveLang images:

1. **Hero Section** (`hero-section.tsx`)
   - Now uses the official LoveLang shop banner

2. **Product Categories** (`product-categories.tsx`)
   - Collection thumbnails for Mango, Peach, and Avocado

3. **Brand Badges** (`brand-badges.tsx`) - NEW
   - Quality certification badges

4. **Before/After** (`before-after.tsx`)
   - Product comparison images

5. **Testimonials** (`testimonials.tsx`)
   - Real customer photos

## 🎨 Image Specifications

- **Collection Images**: 240px width optimized
- **Product Images**: 700px-1000px width for high quality
- **Banner Images**: 1000px+ width for hero sections
- **Badge Icons**: 150px-240px width for UI elements
- **Customer Photos**: 192px width for testimonials

## 📱 Responsive Image Strategy

The `getOptimizedImageUrl()` function automatically adjusts image sizes based on device:

- **Mobile**: 400-600px width
- **Tablet**: 600-800px width  
- **Desktop**: 800-1200px width
- **High-res displays**: 1200px+ width

## 🚀 Benefits

1. **Authentic Brand Imagery**: Real product photos from LoveLang
2. **Optimized Performance**: Dynamic image sizing for faster loading
3. **Consistent Branding**: Centralized image management
4. **SEO Friendly**: Proper alt tags and image optimization
5. **Scalable**: Easy to add new images or update existing ones

## 🔄 Adding New Images

To add new LoveLang images:

1. Add the URL to the appropriate category in `image-urls.ts`
2. Follow the existing naming convention
3. Update type definitions if needed
4. Test across different screen sizes

## 📊 Image Categories Breakdown

- **Total Images**: 30+ authentic LoveLang images
- **Product Images**: 20+ high-quality product photos
- **Brand Assets**: 4 certification badges
- **Customer Content**: 3 testimonial photos
- **Banner/Hero**: 1 main promotional image
- **Collections**: 3 category thumbnails

This comprehensive image system ensures your e-commerce platform uses only authentic, high-quality visuals that represent the LoveLang brand accurately while providing optimal user experience across all devices.