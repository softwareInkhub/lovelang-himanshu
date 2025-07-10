import { motion } from "framer-motion";
import { LOVELANG_IMAGES, getOptimizedImageUrl } from "@/data/image-urls";

// Example component showing different ways to use the LoveLang images
export default function ImageGallery() {
  return (
    <div className="space-y-12">
      {/* Hero Banner Example */}
      <section className="relative">
        <img
          src={LOVELANG_IMAGES.banners.shopAllBanner}
          alt="Shop All Products"
          className="w-full h-64 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
          <h2 className="text-white text-3xl font-bold">Shop All Products</h2>
        </div>
      </section>

      {/* Product Category Grid */}
      <section>
        <h3 className="text-2xl font-bold mb-6">Product Categories</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <img
              src={LOVELANG_IMAGES.collections.avocado}
              alt="Avocado Collection"
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h4 className="font-semibold">Avocado Collection</h4>
            <p className="text-sm text-gray-600">For Damaged Hair</p>
          </div>
          <div className="text-center">
            <img
              src={LOVELANG_IMAGES.collections.mango}
              alt="Mango Collection"
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h4 className="font-semibold">Mango Collection</h4>
            <p className="text-sm text-gray-600">For Frizzy Hair</p>
          </div>
          <div className="text-center">
            <img
              src={LOVELANG_IMAGES.products.peach.icon}
              alt="Peach Collection"
              className="w-full h-48 object-cover rounded-lg mb-3"
            />
            <h4 className="font-semibold">Peach Collection</h4>
            <p className="text-sm text-gray-600">For Hair Fall</p>
          </div>
        </div>
      </section>

      {/* Product Details with Multiple Images */}
      <section>
        <h3 className="text-2xl font-bold mb-6">Product Detail Examples</h3>
        
        {/* Mango Products */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4">Mango Collection</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {LOVELANG_IMAGES.products.mango.primary.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Mango Product ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
            {LOVELANG_IMAGES.products.mango.masks.map((img, index) => (
              <img
                key={`mask-${index}`}
                src={img}
                alt={`Mango Mask ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Avocado Products */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4">Avocado Collection</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {LOVELANG_IMAGES.products.avocado.primary.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Avocado Product ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
            {LOVELANG_IMAGES.products.avocado.shampoo.map((img, index) => (
              <img
                key={`shampoo-${index}`}
                src={img}
                alt={`Avocado Shampoo ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Peach Products */}
        <div className="mb-8">
          <h4 className="text-xl font-semibold mb-4">Peach Collection</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {LOVELANG_IMAGES.products.peach.primary.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Peach Product ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
            {LOVELANG_IMAGES.products.peach.masks.map((img, index) => (
              <img
                key={`mask-${index}`}
                src={img}
                alt={`Peach Mask ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Badges */}
      <section>
        <h3 className="text-2xl font-bold mb-6">Brand Quality Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <img
              src={LOVELANG_IMAGES.badges.fdcaApproved}
              alt="FDCA Approved"
              className="w-16 h-16 mx-auto mb-2 object-contain"
            />
            <p className="text-sm font-semibold">FDCA Approved</p>
          </div>
          <div className="text-center">
            <img
              src={LOVELANG_IMAGES.badges.vitaminInfused}
              alt="Vitamin Infused"
              className="w-16 h-16 mx-auto mb-2 object-contain"
            />
            <p className="text-sm font-semibold">Vitamin Infused</p>
          </div>
          <div className="text-center">
            <img
              src={LOVELANG_IMAGES.badges.vegan}
              alt="Vegan"
              className="w-16 h-16 mx-auto mb-2 object-contain"
            />
            <p className="text-sm font-semibold">Vegan</p>
          </div>
          <div className="text-center">
            <img
              src={LOVELANG_IMAGES.badges.crueltyFree}
              alt="Cruelty Free"
              className="w-16 h-16 mx-auto mb-2 object-contain"
            />
            <p className="text-sm font-semibold">Cruelty Free</p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section>
        <h3 className="text-2xl font-bold mb-6">Customer Photos</h3>
        <div className="grid grid-cols-3 gap-6">
          {LOVELANG_IMAGES.testimonials.map((img, index) => (
            <div key={index} className="text-center">
              <img
                src={img}
                alt={`Customer ${index + 1}`}
                className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
              />
              <p className="text-sm text-gray-600">Happy Customer {index + 1}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Optimized Image Examples */}
      <section>
        <h3 className="text-2xl font-bold mb-6">Responsive Image Examples</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Mobile (400px)</h4>
            <img
              src={getOptimizedImageUrl(LOVELANG_IMAGES.products.mango.primary[0], 400)}
              alt="Mobile optimized"
              className="w-full max-w-sm h-32 object-cover rounded-lg"
            />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Tablet (800px)</h4>
            <img
              src={getOptimizedImageUrl(LOVELANG_IMAGES.products.mango.primary[0], 800)}
              alt="Tablet optimized"
              className="w-full max-w-md h-40 object-cover rounded-lg"
            />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Desktop (1200px)</h4>
            <img
              src={getOptimizedImageUrl(LOVELANG_IMAGES.products.mango.primary[0], 1200)}
              alt="Desktop optimized"
              className="w-full max-w-lg h-48 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

/* 
Usage Examples in Your Components:

1. Hero Section:
<img src={LOVELANG_IMAGES.banners.shopAllBanner} alt="Shop All" />

2. Product Category Cards:
<img src={LOVELANG_IMAGES.collections.avocado} alt="Avocado Collection" />
<img src={LOVELANG_IMAGES.collections.mango} alt="Mango Collection" />

3. Product Detail Pages:
<img src={LOVELANG_IMAGES.products.avocado.primary[0]} alt="Avocado Product" />
<img src={LOVELANG_IMAGES.products.mango.masks[1]} alt="Mango Mask" />

4. Brand Quality Section:
<img src={LOVELANG_IMAGES.badges.fdcaApproved} alt="FDCA Approved" />
<img src={LOVELANG_IMAGES.badges.crueltyFree} alt="Cruelty Free" />

5. Testimonials:
<img src={LOVELANG_IMAGES.testimonials[0]} alt="Customer Photo" />

6. Responsive Images:
<img src={getOptimizedImageUrl(LOVELANG_IMAGES.products.peach.primary[0], 600)} alt="Peach Product" />
*/