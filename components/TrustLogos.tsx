export default function TrustLogos() {
  const logos = [
    { name: "Microsoft", text: "Microsoft" },
    { name: "TikTok", text: "TikTok" },
    { name: "BCG", text: "BCG" },
    { name: "Dropbox", text: "Dropbox" },
    { name: "Scale", text: "Scale" },
    { name: "Salesforce", text: "Salesforce" },
  ];

  return (
    <div className="text-center py-8">
      <p className="text-sm text-gray-500 mb-6">
        Trusted by the{" "}
        <span className="text-gray-700 font-medium">world's biggest companies</span> and{" "}
        <span className="text-[#0D9373] font-medium">3,000,000+</span> people
      </p>
      <div className="flex items-center justify-center flex-wrap gap-8 md:gap-12 opacity-60">
        {logos.map((logo) => (
          <div key={logo.name} className="text-gray-400 font-semibold text-lg">
            {logo.text}
          </div>
        ))}
      </div>
    </div>
  );
}

