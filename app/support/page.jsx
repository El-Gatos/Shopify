export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-matcha-dark mb-12">How can we help?</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Track Order</h2>
          <p className="text-gray-600 mb-6">Enter your order number from your confirmation email to see the current status.</p>
          <input type="text" placeholder="Order #1234" className="w-full p-4 rounded-xl border border-matcha-light bg-white mb-4" />
          <button className="bg-matcha-dark text-white px-8 py-3 rounded-full font-bold">Track</button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mb-2">Email: support@urbanutensil.com</p>
          <p className="text-gray-600">Hours: Mon-Fri, 9am - 5pm PST</p>
        </div>
      </div>
    </div>
  );
}