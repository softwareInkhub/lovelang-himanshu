import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

interface FooterLink {
  text: string;
  href: string;
}

interface FooterConfig {
  companyName: string;
  description: string;
  backgroundColor: string;
  textColor: string;
  links: {
    company: FooterLink[];
    support: FooterLink[];
    legal: FooterLink[];
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  copyright: string;
}

interface FooterSectionProps {
  config: FooterConfig;
}

const FooterSection: React.FC<FooterSectionProps> = ({ config }) => (
  <footer 
    className="py-16"
    style={{ backgroundColor: config.backgroundColor, color: config.textColor }}
  >
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-4 gap-8 mb-12">
        {/* Company Info */}
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold mb-4">{config.companyName}</h3>
          <p className="text-gray-300 mb-6 max-w-md">
            {config.description}
          </p>
          <div className="flex space-x-4">
            {config.socialMedia.facebook && (
              <a href={config.socialMedia.facebook} className="hover:text-orange-400 transition-colors">
                <Facebook size={24} />
              </a>
            )}
            {config.socialMedia.instagram && (
              <a href={config.socialMedia.instagram} className="hover:text-orange-400 transition-colors">
                <Instagram size={24} />
              </a>
            )}
            {config.socialMedia.twitter && (
              <a href={config.socialMedia.twitter} className="hover:text-orange-400 transition-colors">
                <Twitter size={24} />
              </a>
            )}
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            {config.links.company.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            {config.links.support.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 pt-8 text-center">
        <p className="text-gray-400">{config.copyright}</p>
      </div>
    </div>
  </footer>
);

export default FooterSection;