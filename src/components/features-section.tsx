"use client";

interface FeaturesSectionProps {
  features: string[];
}

export function FeaturesSection({ features }: FeaturesSectionProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <div
          key={index}
          className="rounded-xl border border-gray-200 bg-white p-6 text-center transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
        >
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {feature}
          </h4>
        </div>
      ))}
    </div>
  );
}
