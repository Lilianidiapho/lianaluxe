import { Facebook, Twitter, Instagram, Youtube, MapPin, Mail } from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="bg-gradient-to-r from-pink-200 to-pink-800 text-white px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* COLUMN 1 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">StoreOne</h2>

          <div>
            <p className="mb-3 text-sm">Subscribe to Our NewsLetter</p>

            <div className="flex bg-white rounded-full overflow-hidden w-full max-w-xs">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 text-black outline-none"
              />
              <button className="bg-pink-500 px-4 text-white text-sm">
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <Facebook size={18} />
            <Twitter size={18} />
            <Instagram size={18} />
            <Youtube size={18} />
          </div>
        </div>

        {/* COLUMN 2 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Support</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>FAQ</li>
            <li>Return & Exchange</li>
            <li>Shipping</li>
            <li>Size Chart</li>
          </ul>
        </div>

        {/* COLUMN 3 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li>Cookies Policy</li>
            <li>Terms & Condition</li>
            <li>Privacy Policy</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>

        {/* COLUMN 4 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact</h3>

          <div className="flex items-start gap-3 text-sm text-gray-200">
            <MapPin size={18} />
            <p>
              Professional Services Hub <br />
              123 Main Street, Suite 456 <br />
              New York, NY 10001 <br />
              USA
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-200">
            <Mail size={18} />
            <p>help@storeone.com</p>
          </div>

        {/* App Buttons */}
<div className="flex flex-wrap gap-4 mt-6">
  {/* App Store Button */}
  <a
    href="#"
    className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
  >
    <img
      src="/icons8-apple-50.png"
      alt="Apple"
      className="h-6 w-6"
    />
    <div className="leading-tight">
      <p className="text-xs">Download on the</p>
      <p className="text-sm font-semibold">App Store</p>
    </div>
  </a>

  {/* Google Play Button */}
  <a
    href="#"
    className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-xl hover:opacity-90 transition"
  >
    <img
      src="/icons8-google-play-48.png"
      alt="Google Play"
      className="h-6 w-6"
    />
    <div className="leading-tight">
      <p className="text-xs">GET IT ON</p>
      <p className="text-sm font-semibold">Google Play</p>
    </div>
  </a>
</div>

        </div>
      </div>
    </footer>
  );
}
