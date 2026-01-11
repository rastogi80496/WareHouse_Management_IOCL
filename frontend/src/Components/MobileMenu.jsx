import React from 'react';
import { FiMenu } from 'react-icons/fi';

function MobileMenu({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-lg hover:bg-gray-100"
      aria-label="Toggle menu"
    >
      <FiMenu className="text-2xl text-gray-700" />
    </button>
  );
}

export default MobileMenu;
