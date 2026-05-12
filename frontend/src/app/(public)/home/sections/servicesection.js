import { ShieldCheck, Truck, CreditCard, BadgeCheck } from "lucide-react";

export default function ServiceSection() {
  const services = [
    {
      icon: ShieldCheck,
      title: "Professional Service",
      description: "Efficient customer from passionate team",
    },
    {
      icon: CreditCard,
      title: "Safe Transactions",
      description: "Various Reliable Payment Options",
    },
    {
      icon: Truck,
      title: "Secure & Swift Delivery",
      description: "Fast and Reliable Shipping",
    },
    {
      icon: BadgeCheck,
      title: "Premium Quality Guaranteed",
      description: "Top-Notch Craftsmanship",
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="flex items-start gap-4 text-left"
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-pink-600">
                  <Icon size={24} />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
